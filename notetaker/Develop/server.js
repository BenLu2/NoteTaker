const express = require('express');
const path = require('path')
const fs = require('fs');


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

