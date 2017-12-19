var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: String,
  typeOfStyle: String,
  averagePrice: String,
  description: String
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
