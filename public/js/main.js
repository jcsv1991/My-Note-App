document.addEventListener('DOMContentLoaded', function() {
    const notesList = document.getElementById('notes-list');
    const addNoteBtn = document.getElementById('add-note-btn');
    
    // Fetch and display notes on page load
    fetchNotes();

    // Add event listener to the "Add Note" button
    addNoteBtn.addEventListener('click', addNote);

    async function fetchNotes() {
        const res = await fetch('/api/notes');
        const notes = await res.json();
        displayNotes(notes);
    }

    function displayNotes(notes) {
        notesList.innerHTML = '';
        notes.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.className = 'note';
            noteEl.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button class="edit-btn" onclick="editNote('${note._id}')">Edit</button>
                <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
            `;
            notesList.appendChild(noteEl);
        });
    }

    async function addNote() {
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;

        if (title && content) {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content })
            });

            const newNote = await res.json();
            fetchNotes(); // Refresh the notes list
        }
    }

    window.editNote = async function(id) {
        const title = prompt('Enter the new title:');
        const content = prompt('Enter the new content:');

        if (title && content) {
            const res = await fetch(`/api/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content })
            });

            fetchNotes(); // Refresh the notes list
        }
    };

    window.deleteNote = async function(id) {
        const res = await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        });

        fetchNotes(); // Refresh the notes list
    };
});