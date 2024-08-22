const mongoose = require('mongoose');

// Define the Note schema
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // The title field is required
  },
  content: {
    type: String,
    required: true,  // The content field is required
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,  // This references the User model
    ref: 'User',  // The reference to the User model (assuming user authentication is implemented)
    required: true,  // The user field is required
  },
  createdAt: {
    type: Date,
    default: Date.now,  // The createdAt field defaults to the current date
  },
});

// Export the Note model
module.exports = mongoose.model('Note', NoteSchema);