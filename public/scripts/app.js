console.log("Sanity Check: JS is working!");

$(document).ready(function(){

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

});


  // make a GET request for all albums
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
      renderAlbum(restaurant);
    })

    // reset form input values after formData has been captured
    $(this).trigger("reset");
  });

function handleSuccess (restaurants) {
  restaurant.forEach(function(restaurant) {
    renderAlbum(restaurant);
  });
};

function handleError(err){
  console.log('There has been an error: ', err);
}


// this function takes a single album and renders it to the page
function renderAlbum(restaurant) {
  var formattedSongsList = restaurant.songs.map(function(song) {
    return `- (${ song.trackNumber }) ${ song.name }`;
  });
  var formattedSongsStr = formattedSongsList.join(', ');


  // HTML template string for each album
  var albumHtml = `
    <!-- one album -->
    <div class="row album">

      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">

          <!-- begin album internal row -->
            <div class='row'>
              <div class="col-md-3 col-xs-12 thumbnail album-art">
                <img src="../images/800x800.png" alt="album image">
              </div>

              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Album Name:</h4>
                    <span class='album-name'>${ album.name }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Artist Name:</h4>
                    <span class='artist-name'>${ album.artistName }</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Released date:</h4>
                    <span class='album-releaseDate'>${ album.releaseDate }</span>
                  </li>
                  <li class="list-group-item">
                    <h4 class="inline-header">Songs:</h4>
                    <span class='album-songList'>${formattedSongsStr} </span>
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
  $('#albums').prepend(sampleRestaurants);


}

// your code





