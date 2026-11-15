// Get a free API key at https://openweathermap.org/api
// Add your key between the quotation marks in scripts/config.js.
import { WEATHER_API_KEY } from './config.js';

const LATITUDE = -3.119;
const LONGITUDE = -60.0217;
const API_ROOT = 'https://api.openweathermap.org/data/2.5';

const currentContainer = document.querySelector('#current-weather');
const forecastContainer = document.querySelector('#weather-forecast');
const errorContainer = document.querySelector('#weather-error');

function weatherIcon(iconCode, description) {
    const image = document.createElement('img');
    image.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    image.alt = description;
    image.className = 'weather-icon';
    image.width = 88;
    image.height = 88;
    return image;
}

function formatDay(dateString) {
    // The forecast timestamps are supplied in the location's local city time.
    const date = new Date(`${dateString}T12:00:00`);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
}

async function getWeather(endpoint) {
    const url = `${API_ROOT}/${endpoint}?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Weather service returned ${response.status}. Check your API key.`);
    }

    return response.json();
}

function displayCurrentWeather(data) {
    currentContainer.replaceChildren();

    const icon = weatherIcon(data.weather[0].icon, data.weather[0].description);
    const details = document.createElement('div');

    const temperature = document.createElement('p');
    temperature.className = 'current-temp';
    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    const description = document.createElement('p');
    description.className = 'weather-description';
    description.textContent = data.weather[0].description;

    const location = document.createElement('p');
    location.className = 'weather-location';
    location.textContent = `${data.name}, Brazil`;

    details.append(temperature, description, location);
    currentContainer.append(icon, details);
}

function getNextThreeDays(forecastList) {
    const groupedDays = new Map();
    const today = new Date().toLocaleDateString('en-CA');

    forecastList.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
        if (date <= today) return;

        if (!groupedDays.has(date)) groupedDays.set(date, []);
        groupedDays.get(date).push(item);
    });

    return [...groupedDays.entries()].slice(0, 3).map(([date, items]) => {
        const midday = items.find(item => item.dt_txt.includes('12:00:00')) || items[Math.floor(items.length / 2)];
        const maxTemp = Math.max(...items.map(item => item.main.temp_max));
        const minTemp = Math.min(...items.map(item => item.main.temp_min));

        return {
            date,
            day: formatDay(date),
            temp: Math.round(midday.main.temp),
            min: Math.round(minTemp),
            max: Math.round(maxTemp),
            description: midday.weather[0].description,
            icon: midday.weather[0].icon
        };
    });
}

function displayForecast(days) {
    forecastContainer.replaceChildren();

    if (days.length === 0) {
        forecastContainer.textContent = 'Forecast information is currently unavailable.';
        return;
    }

    days.forEach((day) => {
        const card = document.createElement('article');
        card.className = 'forecast-day';

        const heading = document.createElement('h4');
        heading.textContent = day.day;

        const icon = weatherIcon(day.icon, day.description);
        icon.className = '';
        icon.width = 48;
        icon.height = 48;

        const temperature = document.createElement('p');
        temperature.textContent = `${day.temp}°C`;

        const range = document.createElement('small');
        range.textContent = `${day.min}° / ${day.max}°`;

        const description = document.createElement('small');
        description.textContent = day.description;

        card.append(heading, icon, temperature, range, description);
        forecastContainer.append(card);
    });
}

export async function loadWeather() {
    if (!currentContainer || !forecastContainer) return;

    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        currentContainer.textContent = 'Add your OpenWeatherMap API key in scripts/config.js.';
        forecastContainer.textContent = 'The 3-day forecast will appear here after the API key is configured.';
        return;
    }

    try {
        const [currentData, forecastData] = await Promise.all([
            getWeather('weather'),
            getWeather('forecast')
        ]);

        displayCurrentWeather(currentData);
        displayForecast(getNextThreeDays(forecastData.list));
    } catch (error) {
        console.error('Weather error:', error);
        errorContainer.textContent = 'Weather data could not be loaded. Verify your API key and try again.';
        currentContainer.textContent = 'Weather currently unavailable.';
        forecastContainer.textContent = 'Forecast currently unavailable.';
    }
}
