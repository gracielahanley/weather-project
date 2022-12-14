const apiKey = `463fd7t5fb4b4f05a6o78db7b9aa0a0a`;

function getCity() {
    const value = document.querySelector("#inputCity").value;
    const city = value.trim().toLowerCase()
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(`${apiUrl}`).then(weather);
}

function thisDay() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "thursday", "Friday", "Saturday"];
    const day = days[now.getDay()];
    const result = `${day} ${hours}: ${minutes}`;
    const dateHour = document.querySelector(".day");
    dateHour.innerHTML = result
};
thisDay();

function frontChanges(value, id) {
    const doc = document.querySelector(id);
    doc.innerHTML = value;
}

let temp = null;

function weather(response) {
    const lon = response.data.coordinates.longitude;
    const lat = response.data.coordinates.latitude;
    temp = Math.round(response.data.temperature.current);
    frontChanges(temp, '#numberTemp')
    const cityName = response.data.city;
    frontChanges(cityName, '#title-city');
    const sky = response.data.condition.description;
    frontChanges(sky, ".type");
    const humidity = response.data.temperature.humidity;
    frontChanges(`Humidity: ${humidity}%`, "#humidity");
    const wind = response.data.wind.speed;
    frontChanges(`Wind: ${wind}km/h`, "#wind");
    document.getElementById('icon').src = response.data.condition.icon_url;
    const urlDaily = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
    axios.get(urlDaily).then(displayForecast)
}

const button = document.querySelector(".btn");
button.addEventListener("click", getCity);

const input = document.querySelector("#inputCity");
input.addEventListener("submit", getCity);

function success(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    currentCity(lat, lon)
}
function positionData() {
    const position = navigator.geolocation.getCurrentPosition(success);
}

function currentCity(lat, lon) {
    const city = document.querySelector("#inputCity").value;
    const apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(weather);
}

const current = document.querySelector("#current");
current.addEventListener("click", positionData);

function showFahrenheit(event) {
    event.preventDefault();
    celsiusElement.classList.remove("active");
    fahrenheitElement.classList.add("active");
    const fahrenheitTemperature = Math.round((temp * 1.8) + 32);
    frontChanges(fahrenheitTemperature, '#numberTemp')
}

const fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", showFahrenheit);

function showCelsius(event) {
    event.preventDefault();
    fahrenheitElement.classList.remove("active");
    celsiusElement.classList.add("active");
    const celsiusTemperature = temp;
    frontChanges(temp, '#numberTemp');
}

const celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", showCelsius);

function displayForecast(response) {
    const daily = response.data.daily;
    daily.shift();
    const forecastElement = document.querySelector("#forecast");
    let forecastHTML = ``;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    daily.forEach(function (data) {
        const time = new Date(data.time * 1000);
        const day = days[time.getDay()];
        const tempMax = Math.round(data.temperature.maximum);
        const tempMin = Math.round(data.temperature.minimum);
        const iconUrl = data.condition.icon_url;
        forecastHTML = forecastHTML + `                  
    <div class="col-2">
    <div class="weather-forecast-date">
        ${day}
    </div>
    <div>
        <img src="${iconUrl}" alt="" width="36">
    </div>
    <div class="weather-forecast-temperatures">
        <span class="temp-max">${tempMax}??</span>
        <span class="temp-min">${tempMin}??</span>
    </div>
</div>`
    })
    forecastElement.innerHTML = forecastHTML;
}

positionData();
