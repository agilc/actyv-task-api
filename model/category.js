const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
    name: { type: String, required:true },
    description: { type: String, required:true },
    createdBy: { type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }));


exports.Category = Category; 