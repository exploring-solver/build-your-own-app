const tf = require('@tensorflow/tfjs-node');

const createModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }));
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 5, activation: 'softmax' }));
  model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });
  return model;
};

const model = createModel();

const getRecommendations = async (preferences) => {
  const input = tf.tensor2d([Object.values(preferences)]);
  
  const prediction = await model.predict(input);
  const topCategories = Array.from(prediction.dataSync())
    .map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ index }) => index);

  const recommendations = topCategories.map(category => ({
    title: `Recommendation for Category ${category}`,
    description: `This is a personalized recommendation based on your preferences.`
  }));

  return recommendations;
};

module.exports = {
  getRecommendations
};