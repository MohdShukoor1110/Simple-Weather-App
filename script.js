const apiKey = '5bf1f62557f4e79847132dcc21bf6acf';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDisplay = document.querySelector(".weather");
const errMsg = document.querySelector(".error");

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=${city}`;
    const response = await fetch(apiUrl);
    var data = await response.json();
    console.log(data);

    if (response.ok && data.cod === 200) {
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        errMsg.style.display = 'none';
        weatherDisplay.style.display = 'block';
    }
    else {
        errMsg.style.display = 'block';
        errMsg.textContent = `Invalid City Name : ${city}`
        weatherDisplay.style.display = 'none';
    }
};

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});