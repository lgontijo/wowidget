let celsius;
let fahrenheit;
let gif;
let weatherDescription;
let api;
let lat;
let long;

setTimeout(delayWeather, 2000);
fire();
function delayWeather(){
  navigator.geolocation.getCurrentPosition(function(success) {
    lat = success.coords.latitude;
    long = success.coords.longitude;
    api = $.get("http://api.weatherunlocked.com/api/current/" + lat + ',' + long + '?' + 'app_id=' + weather_api_id + '&' + 'app_key='  + weather_api_key).done(function(){
      celsius = (api.responseJSON.temp_c);
      fahrenheit = (api.responseJSON.temp_f);
      gif = (api.responseJSON.wx_icon);
      weatherDescription = (api.responseJSON.wx_desc);
      console.log('done');
    }).done(function(){
      displaying()
      $('#overlay').css('display', 'none')
    });
  });
};
