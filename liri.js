//Environment Variables

require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


//Input Variables
var command = process.argv[2]; // takes input from console, decides which API will run

var search  = process.argv.slice(3).join(" "); // search to put in to API
 

// If statements, determine which API to run based on which command/search was input

// if command = concert-this run bandsintown API
if(command==="concert-this"){


  var queryUrl = "https://rest.bandsintown.com/artists/"+search+"/events?app_id=83408045d4e88b783aac51e14feab609&date=upcoming";

  axios.get(queryUrl).then(function(response){

    var venueArr = response.data;

    for(var i=0; i<venueArr.length; i++){

      console.log("\nVenue name: "+venueArr[i].venue.name+
      "\nLocation: "+venueArr[i].venue.city+", "+venueArr[i].venue.country+
      "\nDate of Event: "+venueArr[i].datetime)
      console.log("\n\n")

    }

  });

}


// if command = spotify-this-song run spotify API
if(command==="spotify-this-song"){

//Default API call
  if(!search){

    search = "Ace of Base"
    spotify
    .search({ type: 'track', query: search, limit: 1 })
    .then(function(response){

      var artArr = response.tracks.items[0];

      console.log("\nAlbum name: "+artArr.album.name+
      "\nArtist(s): "+artArr.artists[0].name+
      "\nPreview URL: "+artArr.preview_url)
        
    }).catch(function(err) {
      console.log(err);
    });

  } else{

  spotify
    .search({ type: 'track', query: search, limit: 1 })
    .then(function(response) {

      var someArr = response.tracks.items[0];

      console.log("\nAlbum name: "+someArr.album.name+
      "\nArtist(s): "+someArr.artists[0].name+
      "\nPreview URL: "+someArr.preview_url)

    }).catch(function(err) {
      console.log(err);
    });
  }
}

//if command = movie-this run OMDb API
if(command==="movie-this"){

  if(!search){

    search = "Mr. Nobody"

    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=8d5b3bbe";

    axios.get(queryUrl).then(function(response){

      console.log("\nTitle: "+ response.data.Title+
      "\nRelease Year: "+ response.data.Year+
      "\nIMDB Rating: "+response.data.imdbRating+
      "\nRotten Tomatoes Rating: "+response.data.Ratings[1].Value+
      "\nCountry: "+response.data.Country+
      "\nLanguage: "+response.data.Language+
      "\nPlot: "+response.data.Plot+
      "\nActors: "+response.data.Actors)
    });
      
}
  
  var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=8d5b3bbe";

  axios.get(queryUrl).then(function(response){

    console.log("\nTitle: "+ response.data.Title+
    "\nRelease Year: "+ response.data.Year+
    "\nIMDB Rating: "+response.data.imdbRating+
    "\nRotten Tomatoes Rating: "+response.data.Ratings[1].Value+
    "\nCountry: "+response.data.Country+
    "\nLanguage: "+response.data.Language+
    "\nPlot: "+response.data.Plot+
    "\nActors: "+response.data.Actors)
  });

}
  
//if command = do-what-it-says pull info from random txt file and run default spotify API call
//default API call if user input is undefined

if(command==="do-what-it-says"){

  fs.readFile("random.txt", "utf8", function(error, data){
    if(error){
      return console.log(error)
    }

    var randomArray=data.split(",")

    search = randomArray[1];

    spotify
    .search({ type: 'track', query: search })
    .then(function(response){

      var defArr = response.tracks.items[0];

      console.log("\nAlbum name: "+defArr.album.name+
      "\nArtist(s): "+defArr.artists[0].name+
      "\nPreview URL: "+defArr.preview_url)
      
    })
  })
}

