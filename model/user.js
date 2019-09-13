const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required:true },
    email: { type: String, required:true },
    picture: { type: String, required:true },
    authUserId: { type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }));


exports.User = User; 