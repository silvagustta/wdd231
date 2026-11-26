import { WEATHER_API_KEY } from "./config.js";

const latitude = -3.09;
const longitude = -60.06;
const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
const forecastWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`

const temperatureElement = document.getElementById("current-temperature");
const weatherElement = document.getElementById("weather-description");
const iconElement = document.getElementById("weather-icon")

// fetch 
async function getCurrentWeather() {
    const response = await fetch(currentWeatherURL);
    const data = await response.json();

    temperatureElement.textContent = `${data.main.temp}°C`;

    weatherElement.textContent = data.weather[0].description;

    iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconElement.alt = data.weather[0].description;
}

getCurrentWeather();

async function getForecastWeather() {
    const response = await fetch(forecastWeatherURL);
    const data = await response.json();

    const dailyForecast = data.list.filter(forecast => {
        return forecast.dt_txt.includes("12:00:00");
    });

    dailyForecast.forEach(forecast => {
        console.log(forecast.dt_txt);
    });

    const firstThree = dailyForecast.slice(0, 3);
    const forecastCards = document.querySelectorAll(".forecast-card");

    firstThree.forEach ((forecast, index) => {
        const card = forecastCards[index];

        const title = card.querySelector("h3");
        const icon = card.querySelector("img");
        const temperature = card.querySelector("p");

        icon.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        icon.alt = forecast.weather[0].description;

        const date = new Date(forecast.dt_txt);

        title.textContent = date.toLocaleDateString("en-Us", {
            month: "short",
            day: "numeric"
        });

        temperature.textContent = `${forecast.main.temp}°C`;
    });
}

getForecastWeather();