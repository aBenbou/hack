const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    try {
        const categoryList = await Category.find();

        if (!categoryList || categoryList.length === 0) {
            return res.status(404).json({ success: false, message: 'No categories found' });
        }

        res.status(200).json(categoryList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get(`/:id`, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post(`/`, async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
        });

        category = await category.save();

        if (!category) {
            return res.status(400).json({ success: false, message: 'Category could not be created' });
        }

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put(`/:id`, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true } // Return the updated document
        );

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete(`/:id`, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;