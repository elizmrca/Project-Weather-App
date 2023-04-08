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

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let days = ["Thu", "Fri", "Sat","Sun"];

let forecastHTML = `<div class="row">`;
        days.forEach(function(day){
            forecastHTML= forecastHTML + 
                `<div class="col-2">
        <div class="weather-forecast-date">${day}
        </div>
        <img id="img-forecast" src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42">
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">18</span>
                <span class="weather-forecast-temperature-min">14</span>
            </div>
        </div>
        `;
            });
        
            forecastHTML = forecastHTML + `</div>`;
            forecastElement.innerHTML= forecastHTML;
            console.log(forecastHTML);
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


let celsiusTemperature=null;

search("Manila");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


displayForecast();




//for conversion

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


let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);




