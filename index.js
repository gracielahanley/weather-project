
    //Include the JavaScript file provided in your project,
    //when loading your project, ask the user "Enter a city" (example: Paris),
    //alert "It is currently 19°C (66°F) in Paris with a humidity of 80%"

    //If the city doesn't exist in the object (i.e: Sydney), 
    //alert "Sorry, we don't know the weather for this city,
    //try going to https://www.google.com/search?q=weather+sydney". Since this is an alert, the link shouldn't be clickable.
    
    //Add this behavior to your project and submit the CodeSandbox URL
    
    //Note: Please round the values in the Alert to the nearest whole number
    //(no decimal points, e.g. 5.45 should be rounded to 5).
  // write your code here

// function convert(c) {
//     return (c*1.8)+ 32;
// }
// let city = prompt("Enter a city");
// console.log(city);
// console.log(weather[city]);
// const resultWeather = (weather[city]);
// if (resultWeather){
//     const round = Math.round(resultWeather.temp); 
//     const fahrent = convert(round);
//     const humidity = resultWeather.humidity;
//     alert(`It is currently ${round}°C (${fahrent}°F) in ${city} with a humidity of ${humidity}%`)
// } else {
//     alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney`)
// };

// const time = document.querySelector("#time");
// let date = new Date();
// //time.innerHTML = date.toLocaleTimeString("en-US");
// time.innerHTML = `${date.getHours()}:${date.getMinutes()}`;

// function change() {
//     const city = document.querySelector("#inputCity").value;
//     const h5 = document.querySelector("h5");
//     h5.innerHTML = city;
// }

// const button = document.querySelector(".btn");
// button.addEventListener("click", change);

// const number = document.querySelector("#numberTemp");
// function convert() {
//     // return (c*1.8)+ 32;
//     number.innerHTML = "19";
// }
// function convert2() {
//     // return (f-32)*5/9;
//     number.innerHTML = "66";
// }
// const celsius = document.querySelector("#celsius");
// const fahrenheit = document.querySelector("#fahrenheit");

// celsius.addEventListener("click", convert);   
// fahrenheit.addEventListener("click", convert2);       
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



