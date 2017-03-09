$('#intro').hide()
//get weather from geolocation

function getWeather(lat, long) {
  const payload = {
    lat: lat,
    lon: long
  }
  $.post('/weather', payload).done((data) => {
    allocateData(data)
  }).fail((err) => {
    console.log(err);
  })
};

function allocateData(data) {

  let city = data["city"].name;
  let country = data["city"].country;

  $('#loading').hide()
  $('#intro').show().append("for " + city)

  let forcast = [];
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
  let $newDay = $('<div>', {'id': 'opaque', 'class': 'card-panel row'});
  let $date = $('<div>', {'class': 'row date'});
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
    let $temp = "temp:  " + data[i].forcast.temp + " ºF"

    $container.append(
      $reportByTime.append(
      $timeContainer.append($time)).append(
      $imgContainer.append($img)).append($description).append($tempContainer.append($temp))
    )
  }
};

function eachDay(data) {
  var day1 = [];
  var day2 = [];
  var day3 = [];
  var day4 = [];
  var day5 = [];

  for(var i = 0; i < data.length; i++) {
    if(data[i].day === 1) {
      day1.push(data[i]);
    } else if(data[i].day === 2) {
      day2.push(data[i]);
    } else if(data[i].day === 3) {
      day3.push(data[i]);
    } else if(data[i].day === 4) {
      day4.push(data[i]);
    } else {
      day5.push(data[i]);
    }
  }
  Promise.all(day1).then((data)=>{
    dataToScreen(day1);
  })
  Promise.all(day2).then((data)=>{
    dataToScreen(day2);
  })
  Promise.all(day3).then((data)=>{
    dataToScreen(day3);
  })
  Promise.all(day4).then((data)=>{
    dataToScreen(day4);
  })
  Promise.all(day5).then((data)=>{
    dataToScreen(day5);
  })
};

function convertDate(unix) {
  var a = new Date(unix * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear()
  var month = months[a.getMonth()];
  var date = a.getDate();
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
