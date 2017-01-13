$('#intro').hide()
//get weather from geolocation
function locationPromise() {
  return new Promise(function(resolve, reject) {
    console.log("retreiving position.....");
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

locationPromise()
  .then((data)=> {
    let coords = [];
    coords.push({"lat": data.coords.latitude})
    coords.push({"lon": data.coords.longitude})
    return coords;
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
  }).catch((err) => {
    console.log(err);
  })
};

function allocateData(data) {
  $('#loading').hide()
  $('#intro').show()

  let forcast = [];

  let city = data["city"].name;
  let country = data["city"].country;

  let counter = 1;

  for(let i = 0; i < data["list"].length-1; i++) {

    let date = convertDate(data['list'][i]['dt']);
    let nextDate = convertDate(data['list'][i+1]['dt']);
    let time = convertTime(data['list'][i]['dt']);

    if(date === nextDate){
      forcast.push(
        { 'city': city,
          'country': country,
           'day': counter,
           'date': date,
           'forcast':
          {
            'time': time,
            'temp': data["list"][i]["main"]["temp"],
            'status': data["list"][i]["weather"][0]["main"],
            'description': data["list"][i]["weather"][0]["description"],
            'icon': data["list"][i]["weather"][0]["icon"]
          }
        }
      )
    } else {
      counter++;
    }
  }
  Promise.all(forcast).then((data) => {
    eachDay(data)
  })
};

function dataToScreen(data) {

  let $newDay = $('<div>', {'class': 'card-panel row'});
  let $date = $('<div>', {'class': 'row', 'style': 'font-family: Playfair Display; font-weight: 700'});
  let $container = $('<div>', {'id': 'all-weather', 'class': 'row'})

    $('#weatherResults').append(
        $newDay.append($date.append(data[0].date)).append($container)
      )

  for (var i = 0; i < data.length; i++) {
      let $img = $('<img>', {'src': 'http://openweathermap.org/img/w/' + data[i].forcast.icon + '.png'});
      let $time = data[i].forcast.time;
      let $reportByTime = $('<div>', {'class': 'col md3 by-time'})
      let $timeContainer = $('<div>', {'class': 'row time'})
      let $imgContainer = $('<div>', {'id': 'row', 'class': 'row'})
      let $description = data[i].forcast.description
      let $tempContainer = $('<div>', {'class': 'row'})
      let $temp = "temp: " + data[i].forcast.temp + " ºF"

        $container.append(
          $reportByTime.append(
          $timeContainer.append($time)).append(
          $imgContainer.append($img)).append($description).append($tempContainer.append($temp))
        )
  }
};

function eachDay(data) {
  // var masterData = [];
  var day1 = [];
  var day2 = [];
  var day3 = [];
  var day4 = [];
  var day5 = [];

  for(var i = 0; i < data.length; i++) {
    if(data[i].day === 1) {
      // dataToScreen(data[i])
      day1.push(data[i]);
    } else if(data[i].day === 2) {
      // dataToScreen(data[i])
      day2.push(data[i]);
    } else if(data[i].day === 3) {
      // dataToScreen(data[i])
      day3.push(data[i]);
    } else if(data[i].day === 4) {
      // dataToScreen(data[i])
      day4.push(data[i]);
    } else {
      // dataToScreen(data[i])
      day5.push(data[i]);
    }
  }
  dataToScreen(day1);
  dataToScreen(day2);
  dataToScreen(day3);
  dataToScreen(day4);
  dataToScreen(day5);
};

function convertDate(unix) {
  var a = new Date(unix * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear()
  var month = months[a.getMonth()];
  var date = a.getDate();
  var h = a.getHours();
  var amPm = h >= 12 ? "pm" : "am";
  var hour = ((h + 11) % 12 + 1);
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var date = month + ' ' + date + ' ' + year;
  return date;
};

function convertTime(unix) {
  var a = new Date(unix * 1000);
  var h = a.getHours();
  var amPm = h >= 12 ? "pm" : "am";
  var hour = ((h + 11) % 12 + 1);
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();

  var time =  hour + ':' + min + amPm;
  return time;
};
