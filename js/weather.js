

    function getWeather(){
      const weatherApiKey = "fe3e4c1d6effc62b0afc57adecb4d741";
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=helsinki&appid=${weatherApiKey}`;
      var xhttp = new XMLHttpRequest();
      json = $.getJSON(url, function(data) {
        console.log(data);
        var temperature = Math.round(data.main.temp);
        var temperatureStr = temperature.toString() + " °C";
        var feels_like = data.main.feels_like;
        var weatherConditionEng = data.weather[0].description;
        var weatherConditionFin;
        switch(weatherConditionEng){
            case "clear sky":
                weatherConditionFin = "selkeää";
                break;
            case "few clouds":
                weatherConditionFin = "enimmäkseen selkeää";
                break;
            case "scattered clouds":
                weatherConditionFin = "hajanaisia pilviä";
                break;
            case "broken clouds":
                weatherConditionFin = "pilvistä";
                break;
            case "rain":
                weatherConditionFin = "sadetta";
                break;
            case "shower rain":
                weatherConditionFin = "sadekuuroja";
                break;
            case "light rain":
                weatherConditionFin = "kevyttä sadetta";
                break;
            case "moderate rain":
                weatherConditionFin = "kohtalaista sadetta"
                break;
            case "light intensity shower rain":
                weatherConditionFin = " tihkusadetta";
                break;
            case "thunderstorm":
                weatherConditionFin = "ukkosta";
                break;
            case "snow":
                weatherConditionFin = "lumisadetta";
                break;
            case "mist":
                weatherConditionFin = "sumua";
                break;
            default:
                weatherConditionFin = "säätilaa ei voitu hakea";

        }
        console.log(weatherConditionFin);
        document.getElementById("weatherCondition").innerHTML = weatherConditionFin;
        document.getElementById("temperature").innerHTML = temperatureStr;
    
        return data;
      });
      
    }
    $(document).ready(function(){getWeather()});
    
