document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('#menu-button');
    const navigation = document.querySelector('#navigation');

    console.log('Botão:', menuButton);
    console.log('Navegação:', navigation);

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            const isOpen = navigation.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });
    }
});

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');

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

console.log(menuButton);
console.log(navigation);