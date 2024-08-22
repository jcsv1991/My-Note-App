const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Note-Taking App!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const connectDB = require('./config/database');
connectDB();