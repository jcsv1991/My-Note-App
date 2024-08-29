// Main JavaScript file to handle authentication, dashboard, and note editing

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded and parsed");

    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');
    const token = localStorage.getItem('token');

    console.log("Token retrieved:", token);
    console.log("Note ID from URL:", noteId);

    // Handle Login and Registration
    if (document.getElementById('login-form')) {
        console.log("Login form detected");

        document.getElementById('register-link').addEventListener('click', () => {
            console.log("Register link clicked");
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form-container').style.display = 'block';
        });

        document.getElementById('login-link').addEventListener('click', () => {
            console.log("Login link clicked");
            document.getElementById('register-form-container').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
        });

        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Login form submitted");

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            console.log("Login credentials:", { email, password });

            try {
                const res = await fetch('/api/auth/login', { //Path for Login
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                console.log("Response status:", res.status);

                const data = await res.json();
                console.log("Response data:", data);

                if (data.token) {
                    localStorage.setItem('token', data.token);
                    console.log("Token stored and redirecting to dashboard");
                    window.location.href = 'dashboard.html';
                } else {
                    console.error("Login failed:", data.msg);
                    alert(data.msg || 'Login failed');
                }
            } catch (error) {
                console.error("Error during login:", error);
            }
        });

        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Register form submitted");

            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            
            console.log("Registration details:", { name, email, password });

            try {
                const res = await fetch('/api/auth/register', { //Path for Registration
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                console.log("Response status:", res.status);

                const data = await res.json();
                console.log("Response data:", data);

                if (data.token) {
                    localStorage.setItem('token', data.token);
                    console.log("Token stored and redirecting to dashboard");
                    window.location.href = 'dashboard.html';
                } else {
                    console.error("Registration failed:", data.msg);
                    alert(data.msg || 'Registration failed');
                }
            } catch (error) {
                console.error("Error during registration:", error);
            }
        });
    }

    // Handle Dashboard
    if (document.getElementById('notes-list')) {
        console.log("Dashboard detected");

        if (!token) {
            console.warn("No token found, redirecting to login");
            window.location.href = 'login.html';
            return;
        }

        try {
            const res = await fetch('/api/notes', {
                method: 'GET',
                headers: { 'x-auth-token': token }
            });

            console.log("Response status:", res.status);

            const notes = await res.json();
            console.log("Notes fetched:", notes);

            const notesList = document.getElementById('notes-list');
            notes.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'note-item';
                noteDiv.innerHTML = `
                    <div>
                        <h3>${note.title}</h3>
                        <p>${note.content}</p>
                    </div>
                    <div>
                        <button onclick="editNote('${note._id}')">Edit</button>
                        <button class="delete" onclick="deleteNote('${note._id}')">Delete</button>
                    </div>
                `;
                notesList.appendChild(noteDiv);
            });
        } catch (error) {
            console.error("Error fetching notes:", error);
        }

        document.getElementById('add-note-button').addEventListener('click', () => {
            console.log("Add note button clicked");
            window.location.href = 'note-editor.html';
        });

        window.editNote = (id) => {
            console.log("Edit note clicked, ID:", id);
            window.location.href = `note-editor.html?id=${id}`;
        }

        window.deleteNote = async (id) => {
            console.log("Delete note clicked, ID:", id);

            try {
                const res = await fetch(`/api/notes/${id}`, {
                    method: 'DELETE',
                    headers: { 'x-auth-token': token }
                });

                console.log("Delete response status:", res.status);

                if (res.status === 200) {
                    console.log("Note deleted, reloading page");
                    window.location.reload();
                } else {
                    console.error("Failed to delete note");
                }
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    }

    // Handle Note Editing
    if (document.getElementById('note-form')) {
        console.log("Note editor detected");

        if (noteId) {
            console.log("Editing note with ID:", noteId);

            try {
                const res = await fetch(`/api/notes/${noteId}`, {
                    method: 'GET',
                    headers: { 'x-auth-token': token }
                });

                console.log("Response status:", res.status);

                const note = await res.json();
                console.log("Fetched note data:", note);

                document.getElementById('note-title').value = note.title;
                document.getElementById('note-content').value = note.content;
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        }

        document.getElementById('note-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Note form submitted");

            const title = document.getElementById('note-title').value;
            const content = document.getElementById('note-content').value;

            console.log("Note data:", { title, content });

            try {
                let method = 'POST';
                let url = '/api/notes';
                if (noteId) {
                    method = 'PUT';
                    url = `/api/notes/${noteId}`;
                }

                const res = await fetch(url, {
                    method,
                    headers: {
                        'x-auth-token': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, content })
                });

                console.log(`${method} response status:`, res.status);

                if (res.status === 200 || res.status === 201) {
                    console.log("Note saved/updated, redirecting to dashboard");
                    window.location.href = 'dashboard.html';
                } else {
                    console.error("Failed to save/update note");
                }
            } catch (error) {
                console.error("Error saving/updating note:", error);
            }
        });
    }
});