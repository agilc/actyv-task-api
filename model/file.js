const mongoose = require('mongoose');

const File = mongoose.model('File', new mongoose.Schema({
    name: { type: String, required:true },
    description: { type: String, required:true },
    url: String,
    type: { type: String, required:true },
    parentId: String,
    container: { type: String, required:true },
    containerId: String,
    expiry: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }));


exports.File = File; 