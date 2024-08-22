const Note = require('../models/Note');

// Get all notes for a user
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }); // Find notes for the authenticated user
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a new note
const addNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      title,
      content,
      user: req.user.id, // Attach the note to the authenticated user
    });

    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing note
const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Ensure the note belongs to the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // Ensure the note belongs to the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Note.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
};