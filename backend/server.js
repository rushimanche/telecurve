require('rootpath')();
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, 'build')));

app.use(cors());

app.use(function(req, res, next) {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
  
});
// file api routes
app.use('/accounts', require('./accounts/accounts.controller'));

// file api routes
app.use('/files', require('./files/files.controller'));

/*
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
*/

// start server
const port = 2000;
app.listen(port, () => console.log('Server listening on port ' + port));

const schedule = require('node-schedule');

var files = require('./files/files.controller');

const job = schedule.scheduleJob('0 0 * * *', function(){
  files.updateS3Signatures()
});
