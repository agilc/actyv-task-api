const mongoose = require('mongoose');

const Dept = mongoose.model('Dept', new mongoose.Schema({
    name: { type: String, required:true },
    description: { type: String, required:true },
    createdBy: { type: String, required:true },
    admins: { type: Array, required: true },
    users: { type: Array },
    updatedByBy: { type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }));


exports.Dept = Dept; 