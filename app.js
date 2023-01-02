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
  let temperature = Math.round(celsiumTemperature)
  let showTemp = document.querySelector("#celsium")
  showTemp.innerHTML=`${temperature}`
  
  celsiumTemperature=response.data.main.temp

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
}

function searchCity(city){
let apiUrl = `${mainUpi}q=${city}&appid=${apiKey}&units=${unit}`;
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
let apiUrlLocation = `${mainUpi}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrlLocation).then(currentForecast)
}

function currentLocation(event){
event.preventDefault()
navigator.geolocation.getCurrentPosition(handlePosition)
}

function showFahrenheitTemp(event){
  event.preventDefault()
  let temperatureElement=document.querySelector("#celsium")
  celsiumLink.classList.remove("active")
  fahrenheitLink.classList.add("active")
  let changeUnit=(9*celsiumTemperature /5)+32
  temperatureElement.innerHTML=Math.round(changeUnit)
  }

function showCelsiumTemp(event){
  event.preventDefault()
  celsiumLink.classList.add("active")
  fahrenheitLink.classList.remove("active")
  let temperatureElement=document.querySelector("#celsium")
  temperatureElement.innerHTML=Math.round(celsiumTemperature)
} 

function nextForecast(){
  let forecast=document.querySelector("#nextForecast")
  let insideHTML=`<div class="row">`
let weekday = [
                "Monday",
        "Tuesday",
        "Wednesday",
             ];
  weekday.forEach(function(day){
   insideHTML=insideHTML + `
        <div class="col-2">
          <div>
          ${day}
          </div>
         <i class="fa-solid fa-cloud-showers-heavy"></i>
         <div class="tempForecast">4<span> °C</span></div>
        </div>
        `;
      }) ;           
    insideHTML=insideHTML + `</div>`;
  forecast.innerHTML=insideHTML;
  console.log(insideHTML)
}
 



let form=document.querySelector("#enterCity")
form.addEventListener("submit",showCity)

let button=document.querySelector("#location")
button.addEventListener("click",currentLocation)

let unit = "metric";
let apiKey = "78fc98c085614cc01c7a0b894f6604c6";
let mainUpi = "https://api.openweathermap.org/data/2.5/weather?"


let coverUnit= document.querySelector("#fahrenheitLink")
coverUnit.addEventListener("click",showFahrenheitTemp)

let recoverUnit=document.querySelector("#celsiumLink")
recoverUnit.addEventListener("click",showCelsiumTemp)

let celsiumTemperature=null

searchCity("Prague")
nextForecast()






