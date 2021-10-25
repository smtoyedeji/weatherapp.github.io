const locationName = document.querySelector("#location-name");
let time = document.querySelector('#time');
let temperature = document.querySelector('#temperature');
let windSpeed = document.querySelector('#windspeed');
let humidityData = document.querySelector('#humidity-data')
;
let sunRise = document.querySelector('#sunrise-time')
let sunSet = document.querySelector('#sunset-time');
let today = document.querySelector('#today');
let summary = document.querySelector('#summary');

window.addEventListener("load", () => {
    let long;
    let lat;

    today.textContent = new Date().toDateString();
    todayTime.textContent = msToTime(new Date().getTime());
    

   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
           long = position.coords.longitude;
           lat = position.coords.latitude;           
           
           const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=468066ddb7bc8793e5042093f28535f0`;

           fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temp, wind_speed, humidity, sunrise, sunset, weather } = data.current;

                temperature.textContent = fahToCel(temp) + String.fromCharCode(176) + "C";
                humidityData.textContent = humidity + "%";
                windSpeed.textContent = wind_speed + "km/hr";
                sunRise.textContent = convertTime(sunrise) + "am";
                sunSet.textContent = convertTime(sunset) + "pm";
                locationName.textContent = data.timezone;
                summary.textContent = weather[0].description;
                
            });
       });   
   } else {
       locationName.textContent = "Location services disabled"        
   }
   
})
  
//convert unix time to 12hr format
function convertTime(unix) {
    var date = new Date(unix * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    if (hours > 12) {
        hours = hours - 12;
    } else {
        hours = date.getHours();
    }
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    return hours + ':' + minutes.substr(-2);
}

//convert temperature in kelvin to celcius 
function fahToCel(temp) {
    var celsius = Math.round(temp - 273.15);
    return celsius;
 }

 
//milliseconds to hhmm
function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes 
}

//time function
function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let session = "AM";
  
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
      
     let time = hh + ":" + mm + session;
  
    document.getElementById("todayTime").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
  }
  currentTime();
  
