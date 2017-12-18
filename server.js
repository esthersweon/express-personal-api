// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/xianyi555/express-personal-api",
    baseUrl: "https://mysterious-everglades-48142.herokuapp.com", 
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Who I am and Where I am from'},
      {method: 'GET', path: '/api/restaurant', description: 'Index of all good restaurants'},
      {method: 'POST', path: '/api/restaurant', description: 'Creat a new good restaurant'},
      {method: 'PUT', path: '/api/restaurants/:id', description: 'Edit a previous restaurant entry and update it'},
      {method: 'DELETE', path: '/api/restaurants/:id', description: 'Destroy a restaurant'}
    ]
  })
});

app.get('/api/profile', function profileIndex(req, res) {
  res.json({
    name: "Sunny Wang",
    githubUsername: "xianyi555",
    githubLink: "https://github.com/xianyi555",
    githubProfileImage: "https://github.com/settings/profile",
    personalSiteLin: "https://www.linkedin.com/in/xianyiwang",
    currentCity: "San Francisco",
    hobbies: [
      {name: "reading", type: "Biography", description: "reading keeps me happy"}, 
      {name: "basketball", type: "Sport", description: "exercising keeps me healthy"}
    ]
  })
});

app.get('/api/restaurant', function restaurantIndex(req, res){
  db.Restaurant.find({}, function(err, allRestaurant){
  res.json(allRestaurant) 
  })
});

app.post('/api/restaurant', function restaurantCreat(req, res){
  db.Restaurant.create(req.body, function(err, newRestaurant){
  if (err) { console.log('error', err); }
  res.json(newRestaurant);
  });
});


// app.get('/api/restaurant/:id', function restaurantShow(req, res){
//   db.Restaurant.findOpById(req.params.id, function(err, oneRes){
//     if (err) {
//       res.status(500).send(err);
//       return;
//     }
//     res.json(oneRes);
//   });
// });

// app.get('/api/restaurant/', function restaurantCreat(req, res){
//   db.Restaurant.create(req.body, function(err, createRes) {
//     if (err) { console.log('error', err); };
//     res.json(createRes);
//   });
// });





/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
