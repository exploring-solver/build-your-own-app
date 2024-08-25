const mongoose = require('mongoose');
const Recommendation = require('./models/Recommendation');

mongoose.connect('mongodb://localhost/ai_personalization', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleRecommendations = [
  {
    title: 'Latest Tech Gadgets',
    description: 'Explore the newest technology innovations and gadgets.',
    category: 'technology',
  },
  {
    title: 'Hidden Gems in Europe',
    description: 'Discover lesser-known travel destinations across Europe.',
    category: 'travel',
  },
  {
    title: 'Fusion Cuisine Masterclass',
    description: 'Learn how to blend different culinary traditions in your cooking.',
    category: 'food',
  },
  {
    title: 'AI in Everyday Life',
    description: 'See how artificial intelligence is transforming our daily routines.',
    category: 'technology',
  },
  {
    title: 'Sustainable Travel Tips',
    description: 'Learn how to minimize your environmental impact while traveling.',
    category: 'travel',
  },
  {
    title: 'Farm-to-Table Cooking',
    description: 'Explore the benefits of using locally-sourced ingredients in your meals.',
    category: 'food',
  },
];

async function populateDb() {
  try {
    await Recommendation.deleteMany({});
    await Recommendation.insertMany(sampleRecommendations);
    console.log('Database populated successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

populateDb();