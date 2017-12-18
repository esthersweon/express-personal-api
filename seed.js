// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var sampleRestaurants = [{
  name: 'Red Dragon',
  typeOfStyle: 'chinese',
  averagePrice: '$15/person',
  description: 'tasty and healthy',
}, {
  name: 'PizzaHub',
  typeOfStyle: 'Italy',
  averagePrice: '$25/person',
  description: 'popular and delicious',
}, {
  name: 'BlueMoon',
  typeOfStyle: 'French',
  averagePrice: '$28/person',
  description: 'classic',
}, {
  name: 'BigCheese',
  typeOfStyle: 'American',
  averagePrice: '$30/person',
  description: 'more creative',
}];


db.Restaurant.remove({}, function(err, restaurants){
  console.log('removed all restaurants');

    db.Restaurant.create(sampleRestaurants, function(err, restaurants){
    // code in here runs after all , restaurants are created
    if (err) { return console.log('ERROR', err); }
    console.log("all restaurants:", restaurants);
    console.log("created", restaurants.length, "restaurants");
    process.exit();
  }); // end remove function
});

//   sampleRestaurants.forEach(function (resObj) {
//     var restaurant = new db.Restaurant(resObj);
//     restaurant.save(function(err, savedRes){
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log('saved ', savedRes.description);
//     });
//   });
// });