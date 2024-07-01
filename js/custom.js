const apiKey = '4d3ca0153a6dcd654ac624cf6bbfe474'; // Replace with your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const hamburger = document.querySelector('.hamburger');

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

async function getWeather(city) {
    if (!city) {
        city = document.getElementById('cityInput').value;
    }
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === '404') {
        alert('City not found');
        return;
    }

    displayWeather(data);
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
    `;
}
