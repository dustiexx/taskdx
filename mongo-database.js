const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Close MongoDB connection when the process is terminated
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit(0);
});

module.exports = mongoose;
