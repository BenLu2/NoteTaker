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

//GET route
app.get('/api/notes', (req,res) => {
      // Send a message to the client
  res.status(200).json(`${req.method} request received to get reviews`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get reviews`);
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
    const { title, text} = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNotes = {
        title,
        text,
        review_id: uuid(),
      };
  
      // Obtain existing reviews
      fs.readFile('./db/reviews.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new review
          parsedNotes.push(newNotes);
  
          // Write updated reviews back to the file
          fs.writeFile(
            './db/reviews.json',
            JSON.stringify(parsedReviews, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated reviews!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNotes,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });
  
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
