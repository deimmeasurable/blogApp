const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000; // Change this to your desired port number

app.use(bodyParser.json());

// Secret key for JWT
const secretKey = 'your-secret-key';


