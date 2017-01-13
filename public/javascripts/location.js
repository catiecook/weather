//get location
function locationPromise() {
  return new Promise(function(resolve, reject) {
    console.log("retreiving position.....");
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

locationPromise()
  .then((data)=> {
    if(data) {
      console.log(data);
      let coords = [];
      coords.push({"lat": data.coords.latitude})
      coords.push({"lon": data.coords.longitude})
      return coords;

    } else {
      let coords = [];
      console.log("No coordinates found, showing Denver, Colorado weather");
      coords.push({"lat": 39.7392})
      coords.push({"lon": 104.9903})
      return coords;
    }
  })
  .then((data) => {
    getWeather(data[0].lat, data[1].lon);
  })
  .catch((err) => {
    console.log(err);
  })
