const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public
router.post('/', async (req, res) => {
  const { user, products, totalAmount, status } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!user || !products || !totalAmount) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const newOrder = new Order({
      user,
      products,
      totalAmount,
      status
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/orders
// @desc    Get all orders
// @access  Public
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products');
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('products');

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error('Error fetching order by ID:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Public
router.put('/:id', async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).send('Missing status field');
  }

  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error('Error updating order status:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/orders/:id
// @desc    Delete order by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const result = await Order.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error('Error deleting order:', err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
