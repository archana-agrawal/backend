const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const client = require('./database/db');
client.main();
const http = require('http');


app.use(express.json());
app.use(bodyParser.json());

//Import Routes
const loginRoute = require('./routes/login');
const registrationRoute = require('./routes/registration');
const profilePictureRoute = require('./routes/profilePicture');
const signupRoute = require('./routes/signup');
 

app.use('/', loginRoute);
app.use('/', registrationRoute);
app.use('/', signupRoute);
app.use('/profilePicture', profilePictureRoute);

app.listen(3000);