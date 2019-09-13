const mongoose = require('mongoose');

const Dept = mongoose.model('Dept', new mongoose.Schema({
    name: { type: String, required:true },
    description: { type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: String, required:true }
  }));


exports.Dept = Dept; 