const express = require('express');
const router = express.Router();
const recommendationModel = require('../ai/recommendationModel');

router.post('/', async (req, res) => {
  try {
    const { preferences } = req.body;
    const recommendations = await recommendationModel.getRecommendations(preferences);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Error generating recommendations' });
  }
});

module.exports = router;