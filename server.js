// DEPENDENCIES
// series of npm packages that we will use to give our server useful functionality

const express = require('express');
// we need to include the path package to get the correct file path for our html
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// EXPRESS CONFIGURATION
// this sets up the basic properties for our express server

// tells node that we are creating an express server
const app = express();

// set initial port
const PORT = process.env.PORT || 3000;

// use the following code to serve images, CSS files and javascript files in a directory named public:
app.use(express.static('public'));

// sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// LOAD DATA
// linking our routes to a data source
// data source holds array of information on notes
// const noteData = require('./db/db');

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
    var text = fs.readFileSync('./db/db.json','utf8');
    // returns notes as JSON objects from our data file
    res.json(text);
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
    // all data stored as string from readFileSync in oldNotes var
    var oldNotes = fs.readFileSync('./db/db.json','utf8');
    // JSON parse converts string into JSON objects
    const noteArray = JSON.parse(oldNotes);
    // sets each req.body, or each note, to a UNIQUE UNIVERSAL ID
    req.body.id = uuidv4();
    // pushes the new note onto the note array
    noteArray.push(req.body);
    // stringify the note array for writeFileSync
    const noteString = JSON.stringify(noteArray);
    // rewrites our database.json with all the notes including new
    fs.writeFileSync('./db/db.json', noteString);
    // return json note objects
    res.json(req.body);
});

// * `DELETE /api/notes/:id` should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete('/api/notes/:id', (req, res) => {
    // query parameter .params returns a variable associated with an object
    const id = req.params.id;
    console.log(id);
    // readFileSync to get all the data
    var oldData = fs.readFileSync('./db/db.json','utf8');
    // returns a string, parse to convert to JSON object
    const oldNoteArray = JSON.parse(oldData);
    // js function filter, return what does not match that id
    const newNoteArray = oldNoteArray.filter(note => note.id !== id);
    // stringify the newNoteArray for writeFileSync
    const newNoteString = JSON.stringify(newNoteArray);
    // take that and rewrite the file over again
    var newData = fs.writeFileSync('./db/db.json', newNoteString);
    // return newData
    res.json(newData);
});

// starts the server to begin listening
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});