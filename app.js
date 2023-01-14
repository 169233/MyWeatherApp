let now = new Date()
let hour = now.getHours()
if(hour<10){
  hour=`0${hour}`
}
let minutes = now.getMinutes()
if(minutes<10){
  minutes=`0${minutes}`
}

let fullTime= (`${hour}:${minutes}`)
let showTime = document.querySelector("#time")
showTime.innerHTML=`${fullTime}`

let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
let day = days[now.getDay()];
let showDay= document.querySelector("#weekDay")
showDay.innerHTML=`${day}`

let year=now.getFullYear()
let months = [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Augu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
let month = months[now.getMonth()];

let numberDate=now.getDate()
let showFullDate=document.querySelector("#date")
showFullDate.innerHTML=`${numberDate}. ${month} ${year}`

function currentForecast(response){
  let temperature = Math.round(response.data.main.temp)
  let showTemp = document.querySelector("#celsium")
  showTemp.innerHTML=`${temperature}`
  
  let headline = response.data.name
  let head=document.querySelector("h1")
  head.innerHTML=`${headline}`

  let description = response.data.weather[0].main
  let showDescription=document.querySelector("#description")
  showDescription.innerHTML=`${description}`

  let humidity=response.data.main.humidity
  let showHumidity=document.querySelector("#humidity")
  showHumidity.innerHTML=` ${humidity}`

  let wind= Math.round(response.data.wind.speed)
  let showWind=document.querySelector("#wind")
  showWind.innerHTML=` ${wind}`

  let country=response.data.sys.country
  let showCountry=document.querySelector("#country")
  showCountry.innerHTML=` ${country}`

  let icon=response.data.weather[0].icon
  let showIcon=document.querySelector("#icon")
  showIcon.innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}@2x.png"/src>`;
  
 getForecast(response.data.coord)
}

function searchCity(city){
let apiUrl = `${mainApi}q=${city}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(currentForecast);
}

function showCity(event){
event.preventDefault()
let input= document.querySelector("#searchCity")
let city = input.value
searchCity(city);
}

function handlePosition(position){
let lat = position.coords.latitude
let lon=position.coords.longitude
let apiUrlLocation = `${mainApi}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrlLocation).then(currentForecast)
}

function currentLocation(event){
event.preventDefault()
navigator.geolocation.getCurrentPosition(handlePosition)
}

function getForecast(coordinate){
 let apiKeyFore="f8e6a9e3d6fde87cb38868da460b1371"  
 let apiUrlForecast=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKeyFore}&units=${unit}`
axios.get(apiUrlForecast).then(nextForecast)
}

function formatDay(timestamp){
  let date= new Date(timestamp*1000)
  let day=date.getDay()
  let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ];
  return days[day]
}

function nextForecast(response){
let dailyForecast=response.data.daily
console.log(dailyForecast)
  let forecast=document.querySelector("#nextForecast")
  let insideHTML=`<div class="row">`

  dailyForecast.forEach(function(forecastDay,index){
    if (index<6) {
   insideHTML=insideHTML + `
        <div class="col-2">
          <div>
          ${formatDay(forecastDay.dt)}
          </div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/src>
          <div class="tempForecast">${Math.round(forecastDay.temp.max)}<span> °C</span></div>
        </div>
        `;}
      }) ;      
  insideHTML=insideHTML + `</div>`;
  forecast.innerHTML=insideHTML;
}

let form=document.querySelector("#enterCity")
form.addEventListener("submit",showCity)

let button=document.querySelector("#location")
button.addEventListener("click",currentLocation)

let unit = "metric";
let apiKey = "78fc98c085614cc01c7a0b894f6604c6";
let mainApi = "https://api.openweathermap.org/data/2.5/weather?"

searchCity("Prague")







