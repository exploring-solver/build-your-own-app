const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: String,
  interests: [String],
  recentInteractions: [String],
});

module.exports = mongoose.model('User', UserSchema);