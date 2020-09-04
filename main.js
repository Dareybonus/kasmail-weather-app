const api = {
    key: "df3e8954796ae722d11f8b0b121cba9d",
    base: "https://api.openweathermap.org/data/2.5/"
}

const city = document.querySelector('.city');
const temperature = document.querySelector(' .current .temp');
const date = document.querySelector('.date');
const searchbox = document.querySelector('.search-box');
const min_max = document.querySelector('.hi-low');
const weather_description = document.querySelector('.weather-description');


searchbox.addEventListener('keypress', setSearch);

function setSearch (evt){

    //enter button is 13

    if(evt.keyCode == 13){
        searchboxQuery(searchbox.value)
}
};

function searchboxQuery (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }) .then(displayResults);
};



//working with weather data from API
function displayResults(weather) {
    console.log(weather);
city.innerText = `${weather.name}, ${weather.sys.country}`;
let now = new Date();
let months = ["january" , "February" ,"March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let dayDate = now.getDate();
let year = now.getFullYear();
date.innerText = `${day} ${dayDate} ${month} , ${year}`;
temperature.innerText = `${Math.round(weather.main.temp)}°c`;
min_max.innerText = `${Math.round(weather.main.temp_min)}°c - ${Math.round(weather.main.temp_max)}°c`;
weather_description.innerText = `${weather.weather[0].description}`;

};


//Registring service worker

if('serviceWorker' in navigator){
    window.addEventListener('load', () =>{
        navigator.serviceWorker
        .register('./sw.js')
        .then(reg => console.log('service Worker: Registered'))

        .catch(err => console.log(`Service worker: Error: ${err}`))
    })
};

