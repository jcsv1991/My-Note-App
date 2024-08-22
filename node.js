const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const express = require('express');
const connectDB = require('./config/database');
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Note-Taking App!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const connectDB = require('./config/database');
connectDB();


// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/users', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));