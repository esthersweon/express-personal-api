console.log("Sanity Check: JS is working!");


// hard-coded data
var sampleRestaurants = [{
  typeOfStyle: 'chinese',
  averagePrice: '$15/person',
  description: 'tasty and healthy',
}, {
  typeOfStyle: 'Italy',
  averagePrice: '$25/person',
  description: 'popular and delicious',
}, {
  typeOfStyle: 'French',
  averagePrice: '$28/person',
  description: 'classic',
}, {
  typeOfStyle: 'American',
  averagePrice: '$30/person',
  description: 'more creative',
}];


$(document).ready(function(){
  
  // make a GET request for all restaurants
  $.ajax({
    method: 'GET',
    url: '/api/restaurants',
    success: handleSuccess,
    error: handleError
  });

  $('#restaurant-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();

    $.post('/api/restaurants', formData, function(restaurant) {
      renderRes(restaurant);
    })

    // reset form input values after formData has been captured
    $(this).trigger("reset");
  });
});

function handleSuccess (sampleRestaurants) {
  sampleRestaurants.forEach(function(restaurant) {
    renderRes(restaurant);
  });
};

function handleError(err){  
  console.log('There has been an error: ', err);
};

function renderRes(setRes) {


// HTML template string for each Restaurant
var resHtml = `
  <!-- one album -->
  <div class="row album">

    <div class="col-md-10 col-md-offset-1">
      <div class="panel panel-default">
        <div class="panel-body">

        <!-- begin album internal row -->
          <div class='row'>
            <div class="col-md-3 col-xs-12 thumbnail album-art">
              <img src="../images/Restaurant.jpg" alt="album image">
            </div>

            <div class="col-md-9 col-xs-12">
              <ul class="list-group">
                <li class="list-group-item">
                  <h4 class='inline-header'>Restaurant Name:</h4>
                  <span class='album-name'>${ setRes.name }</span>
                </li>

                <li class="list-group-item">
                  <h4 class='inline-header'> Type of Style:</h4>
                  <span class='artist-name'>${ setRes.typeOfStyle }</span>
                </li>

                <li class="list-group-item">
                  <h4 class='inline-header'>Average Price:</h4>
                  <span class='album-releaseDate'>${ setRes.averagePrice }</span>
                </li>
                <li class="list-group-item">
                  <h4 class="inline-header">Description</h4>
                  <span class='album-songList'>${ setRes.description } </span>
                </li>
              </ul>
            </div>

          </div>
          <!-- end of album internal row -->

          <div class='panel-footer'>
          </div>

        </div>

      </div>

    </div>

  </div>
  <!-- end one album -->
`;

// render HTML template in the DOM
  $('#resInput').prepend(resHtml);
// your code
}


  var $createRes = $('#create-res');
  // listen for submit even on form
  $createRes.on('submit', function (event) {
    event.preventDefault();

  // serialze form data
  var newRes = $(this).serialize();

  // POST request to create new todo
  $.ajax({
    method: "POST",
    url: '/api/restaurant',
    data: newRes,
    success: function onCreateSuccess(response) {
      console.log(response);

      // add new todo to `allTodo`
      allRestaurant.push(response);

      // render all todos to view
      render();
    }

    });
})
  

    


