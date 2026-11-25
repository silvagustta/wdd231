import { loadWeather } from './weather.js';
import { loadSpotlights } from './spotlight.js';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            navigation.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open navigation menu');
        }
    });
}

const yearElement = document.querySelector('#current-year');
const modifiedElement = document.querySelector('#last-modified');

if (yearElement) yearElement.textContent = new Date().getFullYear();
if (modifiedElement) modifiedElement.textContent = document.lastModified;

loadWeather();
loadSpotlights();
