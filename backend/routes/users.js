const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login Route
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.secret;

    if (!user) {
        return res.status(400).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
            },
            secret,
            { expiresIn: '1d' }
        );

        res.status(200).send({ user: user.email, token: token });
    } else {
        res.status(400).send('Password is incorrect!');
    }
});

// Register Route
router.post('/register', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin,
    });

    try {
        user = await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send('The user cannot be created!');
    }
});

// Get All Users
router.get(`/`, async (req, res) => {
    try {
        const userList = await User.find().select('-passwordHash');
        res.status(200).send(userList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get User Count
router.get(`/get/count`, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).send({ userCount: userCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get User by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'The user with the given ID was not found.' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update User
router.put('/:id', async (req, res) => {
    const userExist = await User.findById(req.params.id);
    if (!userExist) {
        return res.status(404).send('User not found!');
    }

    const newPassword = req.body.password
        ? bcrypt.hashSync(req.body.password, 10)
        : userExist.passwordHash;

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                passwordHash: newPassword,
                isAdmin: req.body.isAdmin,
            },
            { new: true }
        );

        if (!user) {
            return res.status(400).send('The user cannot be updated!');
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete User
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found!' });
        }
        res.status(200).json({ success: true, message: 'The user is deleted!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;