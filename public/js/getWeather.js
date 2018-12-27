let weatherDescription;
let humidity;
let sunRise;
let sunSet;

let coordinates = {
  long: 0,
  lat: 0
};

let fahrenheitTemp = {
  currentTemp: 0,
  maxTemp: 0,
  minTemp: 0
};

let celciusTemp = {
  currentTemp: 0,
  maxTemp: 0,
  minTemp: 0
};

fire();

setTimeout(getCurrentWeather, 3000);
setTimeout(getCityWeather, 3000);

function getCurrentWeather() {
  //Call navigator.geolocation to get user's current location.
  navigator.geolocation.getCurrentPosition(function(response) {
    lat = response.coords.latitude;
    long = response.coords.longitude;

    //calls the openWeather API.
    let api = $.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_api_id}`
    )
      .done(function() {
        //Parses the API's responses and updates the objectes declared above with the the fahrenheit values.
        celciusTemp.currentTemp =
          Math.round((api.responseJSON.main.temp - 273.15) * 10) / 10;
        celciusTemp.minTemp =
          Math.round((api.responseJSON.main.temp_min - 273.15) * 10) / 10;
        celciusTemp.maxTemp =
          Math.round((api.responseJSON.main.temp_max - 273.15) * 10) / 10;

        //Parses through the API's responses and updates the objectes declared above with the the celcius values.
        fahrenheitTemp.currentTemp =
          Math.round((1.8 * (api.responseJSON.main.temp - 273) + 32) * 10) / 10;
        fahrenheitTemp.minTemp =
          Math.round((1.8 * (api.responseJSON.main.temp_min - 273) + 32) * 10) /
          10;
        fahrenheitTemp.maxTemp =
          Math.round((1.8 * (api.responseJSON.main.temp_max - 273) + 32) * 10) /
          10;

        //Parses through the API's response and update the weatherDescription. There's additional code to capitalize the first letter of the string.
        weatherDescription =
          api.responseJSON.weather["0"].description.charAt(0).toUpperCase() +
          api.responseJSON.weather["0"].description.slice(1);

        //Parses through the API's response and update the sunRise. There's additional code to get the hours and the minutes from new Date().
        let sunRiseTime = new Date(api.responseJSON.sys.sunrise * 1000);
        sunRise = `${sunRiseTime.getHours()}:${sunRiseTime.getMinutes()} AM`;

        //Parses through the API's response and update the sunSet. There's additional code to get the hours and the minutes from new Date().
        let sunSetTime = new Date(api.responseJSON.sys.sunset * 1000);
        sunSet = `${sunSetTime.getHours()}:${sunSetTime.getMinutes()} PM`;
      })
      .done(function() {
        // It checks the whether the widget value is 1 or 0, if the value is 1 then the widgets are displayed
        displaying();

        // Reomves the loading spinner
        $(".preloader-background").fadeOut("slow");
        $(".preloader-wrapper").fadeOut("slow");
      });
  });
}

function getCityWeather(city = "goiania") {
  //calls the openWeather API.
  let api = $.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api_id}`
  ).done(function() {
    //Parses the API's responses and updates the objectes declared above with the the fahrenheit values.
    celciusTemp.currentTemp =
      Math.round((api.responseJSON.main.temp - 273.15) * 10) / 10;
    celciusTemp.minTemp =
      Math.round((api.responseJSON.main.temp_min - 273.15) * 10) / 10;
    celciusTemp.maxTemp =
      Math.round((api.responseJSON.main.temp_max - 273.15) * 10) / 10;

    //Parses through the API's responses and updates the objectes declared above with the the celcius values.
    fahrenheitTemp.currentTemp =
      Math.round((1.8 * (api.responseJSON.main.temp - 273) + 32) * 10) / 10;
    fahrenheitTemp.minTemp =
      Math.round((1.8 * (api.responseJSON.main.temp_min - 273) + 32) * 10) / 10;
    fahrenheitTemp.maxTemp =
      Math.round((1.8 * (api.responseJSON.main.temp_max - 273) + 32) * 10) / 10;

    //Parses through the API's response and update the weatherDescription. There's additional code to capitalize the first letter of the string.
    weatherDescription =
      api.responseJSON.weather["0"].description.charAt(0).toUpperCase() +
      api.responseJSON.weather["0"].description.slice(1);

    //Parses through the API's response and update the sunRise. There's additional code to get the hours and the minutes from new Date().
    let sunRiseTime = new Date(api.responseJSON.sys.sunrise * 1000);
    sunRise = `${sunRiseTime.getHours()}:${sunRiseTime.getMinutes()} AM`;

    //Parses through the API's response and update the sunSet. There's additional code to get the hours and the minutes from new Date().
    let sunSetTime = new Date(api.responseJSON.sys.sunset * 1000);
    sunSet = `${sunSetTime.getHours()}:${sunSetTime.getMinutes()} PM`;
  });
}
