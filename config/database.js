const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/note-taking-app', {
    //await mongoose.connect('mongodb://localhost:27017/note-taking-app', {
    // useNewUrlParser: true,
    //useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;