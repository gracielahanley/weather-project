const apiKey = `597c40c39084687093b091cd48b366f8`;

function getCity() {
    const city = document.querySelector("#inputCity").value;
    console.log(city);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(`${apiUrl}`).then(weather);
}

function thisDay(){
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let result = `${day} ${hours}: ${minutes}`;
let dateHour = document.querySelector(".day");
dateHour.innerHTML = result
};
thisDay();

function weather(response) {
    // let temp = Math.round(response.data.main.temp);
    // let numberTemp = document.querySelector("#numberTemp");
    // numberTemp.innerHTML = temp;
    const temp = Math.round(response.data.main.temp);
    frontChanges(temp,'#numberTemp')
    const cityName = response.data.name;
    frontChanges(cityName, '#title-city');
    const sky = response.data.weather[0].main;
    frontChanges(sky, ".type");
    const humidity = response.data.main.humidity;
    frontChanges(`Humidity: ${humidity}%`, "#humidity");
    const wind = response.data.wind.speed;
    frontChanges(`Wind: ${wind}km/h`, "#wind");
    console.log(response)
}

function frontChanges(value,id){
    const doc = document.querySelector(id);
    doc.innerHTML = value;
}

const button = document.querySelector(".btn");
button.addEventListener("click", getCity);

const input = document.querySelector("#inputCity");
input.addEventListener("submit", getCity);

function success(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    console.log(lat)
    console.log(lon)
    currentCity(lat, lon)
}
function positionData(){
    const position = navigator.geolocation.getCurrentPosition(success);
}
function currentCity(lat, lon) {
    const city = document.querySelector("#inputCity").value;
    console.log(city);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(`${apiUrl}`).then(weather);
}

const current = document.querySelector("#current");
current.addEventListener("click", positionData);



