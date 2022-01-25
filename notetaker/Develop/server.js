const express = require('express');
const path = require('path')
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path')

app.use(express.static('public'));

