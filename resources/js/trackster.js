/*
Enable the user the search for something by clicking on the "search" button/icon.
*/

/*
...API information...
Application name	Trackster
API key	f74819f6523ea8f9b74dad812cd38f60
Shared secret	59006665c3219f70df71fc4f07bfecc4
Registered to	jrobie8385
example url: http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=YOUR_API_KEY&format=json
Paste into URL to see example json ouput: http://ws.audioscrobbler.com/2.0/?method=track.search&track=Confession&api_key=f74819f6523ea8f9b74dad812cd38f60&format=json
*/


let Trackster = {};

let API_KEY = "f74819f6523ea8f9b74dad812cd38f60";
let BASE_URL = "http://ws.audioscrobbler.com/2.0/";

$(document).ready(function(){
  $(".search-button").on("click", function() {
    let $value = $("#text-box-input").val() //http://api.jquery.com/val/  You need to refer to the id in the "input" element.
    Trackster.searchTracksByTitle($value);
  });
});

Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: BASE_URL + "?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json",
    datatype: "jsonp",
    success: function(data) {
      Trackster.renderTracks(data.results.trackmatches.track);
    }
  });
};

Trackster.renderTracks = function(trackArray) {
  $("#trackList").empty(); //empties the results once I make a new query so the results do not continuously compound on each other.
  for(let trackItem = 0; trackItem < trackArray.length; trackItem++) {
    let displayImage = trackArray[trackItem].image[1]["#text"];
    let htmlTrackRow = (
  '<div class="row">' + //make sure this row is in the append feature.  do not put it in the html file before the #tracklist id.
    '<div class="track col-lg-12 col-md-12 col-xs-12">' +
    '<div class="play-button col-lg-1 col-md-1 col-xs-1">' +
      '<a href="'+ trackArray[trackItem].url + '"><i class="fas fa-play-circle"></i></a>' +
    '</div>' +
      '<div class="song col-lg-4 col-md-4 col-xs-4">' +
        '<a>' + trackArray[trackItem].name  + '</a>' +
      '</div>' +
      '<div class="artist col-lg-4 col-md-4 col-xs-4">' +
        '<a>' + trackArray[trackItem].artist + '</a>' +
      '</div>' +
      '<div class="album col-lg-1 col-md-1 col-xs-1">' +
        '<a><img src="' + displayImage + '"/></a>' +
      '</div>' +
      '<div class="popularity col-lg-2 col-md-2 col-xs-2">' +
        '<a>' + trackArray[trackItem].listeners + '</a>' +
      '</div>' +
    '</div>' +
  '</div>')
    $("#trackList").append(htmlTrackRow);
  }
};
