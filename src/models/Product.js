const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  description: { type: String },
  datePosted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
