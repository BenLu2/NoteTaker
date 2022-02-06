const express = require('express');
const path = require('path')
const Notes = require('./db/db.json')
const fs = require('fs');

// Helper method for generating unique ids
const uuid = require('./helper/uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const { url } = require('inspector');
const { urlencoded } = require('express');

//middleware
app.use(express.json());
app.use(express/urlencoded({ extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname, '/public/index.html')) 
});

//GET request for notes
app.get('/notes', (req,res) =>
{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//API routes
app.get('/api/notes', (req,res) => {
      // Send a message to the client
  res.status(200).json(`${req.method} request received to get reviews`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get reviews`);
});

// POST request to add a note

