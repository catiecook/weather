
getLocation()

function getLocation() {
  $.getJSON('https://ipinfo.io/geo', function(response) {
    var loc = response.loc.split(',');
    var coords = {
      latitude: loc[0],
      longitude: loc[1]
    }
    getWeather(coords.latitude, coords.longitude)
    })
}
