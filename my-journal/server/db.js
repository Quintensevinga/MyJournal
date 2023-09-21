const mongoose = require('mongoose');
const DB_PORT = 27017;
const DB_NAME = 'my-journal';

mongoose.connect(
  `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

module.exports = mongoose;