// DEPENDENCIES
// series of npm packages that we will use to give our server useful functionality

const express = require('express');
// we need to include the path package to get the correct file path for our html
const path = require('path');

// EXPRESS CONFIGURATION
// this sets up the basic properties for our express server

// tells node that we are creating an express server
const app = express();

// set initial port
const PORT = process.env.PORT || 3000;

// sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML GET Requests
// below code handles when a user 'visit' a page
// in each of the below cases the user is shown an HTML page of content

// * `GET *` should return the `index.html` file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
// * `GET /notes` should return the `notes.html` file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// API GET Requests
// below code handles when a user 'visit' a page
// in each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin...)
// they are shown a JSON of the data in the table

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.json(newNote);
    console.log();
});

// API POST Requests
// below code handles when a user 'submits' a form and thus submits data to the server
// in each of the below cases, when a user 'submits' form data
    // (ex: JSON object)
// the JSON is pushe dto the appropriate JS array
    // (ex: user fills out a note, this data is sent to the server)
// then the server saves the data to the notes array

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into `npm` packages that could do this for you).
app.post('/api/notes', (req, res) => {

    jsonNotes.push(req.body);
    res.json(true);

    console.log(jsonNotes);
});

// * `DELETE /api/notes/:id` should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete('/api/notes/:id', (req, res) => {

});





// starts the server to begin listening
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});