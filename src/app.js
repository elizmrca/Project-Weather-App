function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes} `;
}

function formatDay(timestamp){
    let date = new Date(timestamp*1000);
    let day= date.getDay();
    let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}


function displayForecast(response) {
    console.log(response.data.daily);
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let days = ["Thu", "Fri", "Sat","Sun"];

let forecastHTML = `<div class="row">`;
        forecast.forEach(function(forecastDay, index){
        if (index < 6){

        forecastHTML= forecastHTML + 
            `<div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
            </div>
            <img id="img-forecast" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42">
                <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                    <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
            </div>
            `;
        }
        });
        
            forecastHTML = forecastHTML + `</div>`;
            forecastElement.innerHTML= forecastHTML;
            console.log(forecastHTML);
        }

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey="5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);

    axios.get(apiUrl).then(displayForecast);

}

function displayTemperature(response){
    console.log(response.data);

    let temperatureElement=document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let weatherIconElement=document.querySelector("#weatherIcon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherIconElement.setAttribute("alt",response.data.weather[0].description);

    getForecast(response.data.coord);

    console.log(response.data);
}


function search(city){
    let apiKey="5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    console.log(cityInputElement.value);
}


function convertToFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //remove the active class from the celsius link
    celsiusLink.classList.remove("active");
    //add the active class to the fahrenheit link
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = Math.round((celsiusTemperature * 9)/5 + 32);
    temperatureElement.innerHTML=Math.round(fahrenheitTemp);
}

function convertToCelsius(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    //add the active class from the celsius link
    celsiusLink.classList.add("active");
    //remove the active class to the fahrenheit link
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature=null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);


search("Manila");


