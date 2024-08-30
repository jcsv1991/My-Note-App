# My-Note-App

A simple and secure note-taking application built with Node.js, Express.js, MongoDB, and JWT authentication. This application allows users to register, log in, create, update, delete, and view notes. It includes user authentication to ensure that only authenticated users can manage their notes.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Notes](#notes)
- [Request & Response Formats](#request--response-formats)
- [Important Notes](#important-notes)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication (JWT-based)
- Create, read, update, and delete notes
- Secure API with authentication middleware
- Responsive front-end built with HTML and CSS

## Installation

To set up the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4 or higher)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/note-taking-app.git
   cd note-taking-app

2.  **Start the Application:**
    in terminal enter:
    node app.js
    The response should show:
    Server is running on port 3000
    MongoDB connected

## SETUP
Database Setup

	•	Ensure MongoDB is running on your machine.
	•	The default database name is note-taking-app, and it will be created automatically upon running the app.

Running the App

	•	Visit http://localhost:3000/login.html in your browser to view the front-end interface.
	•	Use Postman or any API client to interact with the backend API.

## API Endpoints

Authentication

Register a New User

	•	URL: /api/auth/register
	•	Method: POST
	•	Access: Public
	•	Description: Registers a new user and returns a JWT token.
	•	Request Body: (json)
        {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "password": "password123"
        }
    •	Response:
        {
            "token": "JWT token here"
        }

Login a User

	•	URL: /api/auth/login
	•	Method: POST
	•	Access: Public
	•	Description: Authenticates a user and returns a JWT token.
	•	Request Body:
        {
            "email": "johndoe@example.com",
            "password": "password123"
        }
    	•	Response:
        {
            "token": "JWT token here"
        }

NOTES

Get All Notes for a User

	•	URL: /api/notes
	•	Method: GET
	•	Access: Private (requires JWT token)
	•	Description: Retrieves all notes for the authenticated user.
	•	Response:
        [
        {
            "_id": "5f8d0d55b54764421b7156c8",
            "title": "Note 1",
            "content": "Content of Note 1",
            "user": "5f8d0d55b54764421b7156c7",
            "createdAt": "2024-08-29T10:00:00Z"
        },
        {
            "_id": "5f8d0d55b54764421b7156c9",
            "title": "Note 2",
            "content": "Content of Note 2",
            "user": "5f8d0d55b54764421b7156c7",
            "createdAt": "2024-08-29T12:00:00Z"
        }
        ]

Get a Single Note by ID

	•	URL: /api/notes/:id
	•	Method: GET
	•	Access: Private (requires JWT token)
	•	Description: Retrieves a specific note by its ID.
	•	Response:
        {
            "_id": "5f8d0d55b54764421b7156c8",
            "title": "Note 1",
            "content": "Content of Note 1",
            "user": "5f8d0d55b54764421b7156c7",
            "createdAt": "2024-08-29T10:00:00Z"
        }

Add a New Note

	•	URL: /api/notes
	•	Method: POST
	•	Access: Private (requires JWT token)
	•	Description: Adds a new note for the authenticated user.
	•	Request Body:
        {
            "title": "New Note",
            "content": "Content of the new note"
        }
    •	Response:   
        {
            "_id": "5f8d0d55b54764421b7156d0",
            "title": "New Note",
            "content": "Content of the new note",
            "user": "5f8d0d55b54764421b7156c7",
            "createdAt": "2024-08-29T14:00:00Z"
        }

Update an Existing Note

	•	URL: /api/notes/:id
	•	Method: PUT
	•	Access: Private (requires JWT token)
	•	Description: Updates a note by its ID.
	•	Request Body:
        {
            "title": "Updated Note Title",
            "content": "Updated content of the note"
        }
    •	Response:
        {
            "_id": "5f8d0d55b54764421b7156d0",
            "title": "Updated Note Title",
            "content": "Updated content of the note",
            "user": "5f8d0d55b54764421b7156c7",
            "createdAt": "2024-08-29T14:00:00Z"
        }

Delete a Note

	•	URL: /api/notes/:id
	•	Method: DELETE
	•	Access: Private (requires JWT token)
	•	Description: Deletes a note by its ID.
	•	Response:
        {
             "msg": "Note removed"
        }





Request & Response Formats

	•	Content-Type: application/json
	•	Authentication: Bearer token passed in the Authorization header (e.g., Authorization: Bearer <token>)

Important Notes

	•	Security: Make sure to keep your JWT_SECRET secure and avoid sharing it publicly.
	•	Error Handling: The API returns appropriate status codes and messages for errors. For example, a 404 is returned if a note is not found.
	•	Environment Variables: Ensure you have a .env file with the necessary environment variables.

Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes. Ensure that your code follows best practices and is well-documented.

License

This project is licensed under the my License.
