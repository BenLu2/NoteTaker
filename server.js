const express = require('express');
const path = require('path');
const Notes = require('./db/db.json');
const fs = require('fs');

// Helper method for generating unique ids
const uuid = require('./helper/uuid');


const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

//Set up the home page
app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname, './public/index.html')) 
});


// Setup the /api/notes get route
app.get("/api/notes", function(req, res) {
  // Read the db.json file and return all saved notes as JSON.
    res.json(Notes);
    console.info(`${req.method} request received to get notes`);
    });

    //GET request for notes
app.get('/notes', (req,res) =>
{
    res.sendFile(path.join(__dirname, './public/notes.html'))
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
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new notes
          parsedNotes.push(newNote);
  
          // Write updated notes back to the file
          fs.writeFile(
            './db/db.json',
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

  app.delete("/api/notes/:id", function(req, res) {
    Notes.splice(req.params.id, 1);
    updateDb();
    console.log("Deleted note with id "+req.params.id);
});
  
//updates the json file whenever a note is added or deleted
  function updateDb() {
    fs.writeFile("db/db.json",JSON.stringify(Notes,'\t'),err => {
              if (err) throw err;
              return true;
          });
      }


  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
