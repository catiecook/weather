//get location
// locationPromise()
//
// var coords = getLocation()
// console.log(coords);
// console.log("hello");

// Promise.all(coords).then((data)=>{
//   console.log(data);
// })

getLocation()


function getLocation() {
  // return new Promise((resolve, reject) => {
    $.getJSON('https://ipinfo.io/geo', function(response) {
      var loc = response.loc.split(',');
      var coords = {
        latitude: loc[0],
        longitude: loc[1]
      }
      console.log(coords);
      getWeather(coords.latitude, coords.longitude)
      })
    // })
}



//   .then((data) => {
//     getWeather(data.lat, data.lon);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
