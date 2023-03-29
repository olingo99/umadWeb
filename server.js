// Import express
let express = require('express');

// Initialize the app
let app = express();

app.use(express.json());

let session = require('express-session');

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized : false
  }));

const Sequelize = require('sequelize');
const db = require('./database.js');


db.sync({alter: true}).then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });




let routes = require('./routes.js');
app.use(express.static('public'));

app.use('/', routes);


;

// Setup server port
let port = 8000;
// Launch app to listen to specified port
app.listen(port, function () {
    console.log('Server running on port ' + port);
});
