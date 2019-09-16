const mongoose = require('mongoose');

const File = mongoose.model('File', new mongoose.Schema({
    name: { type: String, required:true },
    description: String,
    url: String,
    type: { type: String, required:true },
    parentId: String,
    container: { type: String, required:true },
    containerId: String,
    expiry: Date,
    createdBy: { },
    updatedBy: { },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    category: String,
    checkoutStatus:{ type: Number, default: 0 },
    checkedOutBy: String,
    revisionHistory: Array,
    metadata: Array,
    expiry: Date
  }));


exports.File = File; 