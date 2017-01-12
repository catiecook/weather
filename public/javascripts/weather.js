
//get weather from geolocation
$('#intro').hide()

function locationPromise() {
  return new Promise(function(resolve, reject) {
    console.log("retreiving position.....");
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

locationPromise()
  .then((data)=> {
    console.log("first part", data);
    let coords = [];

    coords.push({"lat": data.coords.latitude})
    coords.push({"lon": data.coords.longitude})
    return coords;
    // return displayLocation(lat, lon);
  })
  .then((data) => {
    getWeather(data[0].lat, data[1].lon);
  })
  .catch((err) => {
    console.log(err);
  })

// find city and state from gps coordinates
function displayLocation(lat,lon){
    let positions = [] //empty array to hold city, state
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=true&ssl=true';
    return $.getJSON(url).then(function(data) {

      var addressComponents = data.results[0].address_components;
      for(i=0;i<addressComponents.length;i++){
        var types = addressComponents[i].types;
        if(types=="locality,political"){
          positions.push(addressComponents[i].long_name);
        }
        if(types=="administrative_area_level_1,political"){
          positions.push(addressComponents[i].long_name);
        }
      }
      return(positions);
    })
};

function getWeather(lat, lon) {
  const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?';
  let url = baseURL + 'lat=' + lat + '&lon=' + lon + '&appid='+ apiKey + "&units=imperial&mode=json";

  $.get(url).then((data) => {
    allocateData(data)
  })
};

function allocateData(data) {
  $('#loading').hide()
  $('#intro').show()
  let forcast = [];

  let city = data["city"].name;
  let country = data["city"].country;

  for(let i = 0; i < data["list"].length-1; i++) {

    var dateTime = convertTime(data['list'][i]['dt']);

    forcast.push(
      {
        'city': city,
        'country': country,
        'date': dateTime,
        'temp': data["list"][i]["main"]["temp"],
        'status': data["list"][i]["weather"][0]["main"],
        'description': data["list"][i]["weather"][0]["description"],
        'icon': data["list"][i]["weather"][0]["icon"]
      }
    )
  }
console.log(forcast.length);
 dataToScreen(forcast)
}

function convertTime(unix) {
  var a = new Date(unix * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear()
  var month = months[a.getMonth()];
  var date = a.getDate();
  var h = a.getHours();
  var amPm = hour >= 12 ? "PM" : "AM";
  var hour = ((h + 11) % 12 + 1);
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();

  var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ' ' + amPm;
  return time;
}

function dataToScreen(data) {
  for (var i = 0; i < data.length; i++) {
    let $newDay = $('<div>', {'class': 'card-panel'})
    let $date = $('<div>', {'class': 'row'})
    let $info = $('<div>', {'class': 'col md4'})
    let $img = $('<img>', {'src': 'http://openweathermap.org/img/w/' + data[i].icon + '.png'})


      $('#weatherResults').append(
        $newDay.append(
          $date.append(
            data[i].date
          )).append($info.append(
            $img)
            .append(
              data[i].description)
            )
      )

  }

}
