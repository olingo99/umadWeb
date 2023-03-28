// Import express
let express = require('express');
// Initialize the app
let app = express();

app.use(express.json());


let routes = require('./routes.js');
app.use(express.static('public'));

app.use('/', routes);

let sequelize = require



// Setup server port
let port = 8000;
// Launch app to listen to specified port
app.listen(port, function () {
    console.log('Server running on port ' + port);
});
