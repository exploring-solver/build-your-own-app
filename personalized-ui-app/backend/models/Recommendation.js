const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);