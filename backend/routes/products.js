const {Product} = require('../models/product');
const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        filter = { category: { $in: req.query.categories.split(',') } };
    }
    try {
        const productList = await Product.find(filter).populate('category');
        if (!productList) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }
        res.status(200).send(productList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post(`/`, async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send('Invalid Category');

        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            unitPrice: req.body.unitPrice,
            quantity: req.body.quantity,
            cost: req.body.cost,
            transactionDate: req.body.transactionDate,
        });

        const savedProduct = await product.save();
        res.status(201).send(savedProduct);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }

    try {
        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send('Invalid Category');

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                category: req.body.category,
                unitPrice: req.body.unitPrice,
                quantity: req.body.quantity,
                cost: req.body.cost,
                transactionDate: req.body.transactionDate,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }

        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;