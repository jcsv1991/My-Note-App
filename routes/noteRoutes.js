const express = require('express');
const router = express.Router();
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/noteController');
const auth = require('../middleware/auth');
// @route   GET /api/notes
// @desc    Get all notes for a user
// @access  Private
router.get('/', auth, getNotes);

// @route   POST /api/notes
// @desc    Add a new note
// @access  Private
router.post('/', auth, addNote);

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', auth, updateNote);

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', auth, deleteNote);

module.exports = router;