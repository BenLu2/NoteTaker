const express = require('express');
const path = require('path');
const Notes = require('./notetaker/Develop/db/db.json');
const fs = require('fs');

// Helper method for generating unique ids
const uuid = require('./notetaker/Develop/helper/uuid');


const PORT = process.env.PORT || 3001;

const app = express();

const { url } = require('inspector');
const { urlencoded } = require('express');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('./notetaker/Develop/public'));

app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname, './notetaker/Develop/public/index.html')) 
});

//GET request for notes
app.get('/notes', (req,res) =>
{
    res.sendFile(path.join(__dirname, './notetaker/Develop/public/notes.html'))
});

//GET route
app.get('/api/notes', (req,res) => {
      // Send a message to the client
  res.status(200).json(`${req.method} request received to get notes`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a notes`);
  
    // Destructuring assignment for the items in req.body
    const {title, text, id} = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      // Obtain existing notes
      fs.readFile('./notetaker/Develop/db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new notes
          parsedNotes.push(newNote);
  
          // Write updated notes back to the file
          fs.writeFile(
            './notetaker/Develop/db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting notes');
    }
  });
  
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
