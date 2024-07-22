const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// @route   POST /api/categories
// @desc    Create a new category
// @access  Public
router.post('/', async (req, res) => {
  const { categoryName } = req.body;

  try {
    let category = await Category.findOne({ categoryName });
    if (category) {
      return res.status(400).json({ msg: 'Category already exists' });
    }

    category = new Category({ categoryName });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/categories/:id
// @desc    Get a category by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/categories/:id
// @desc    Update a category by ID
// @access  Public
router.put('/:id', async (req, res) => {
  const { categoryName } = req.body;

  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    category.categoryName = categoryName;
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete a category by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    await category.deleteOne();
    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;