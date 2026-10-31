// Last modified date
document.querySelector('#lastModified').textContent=
    document.lastModified;

// responsive navigation
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-navigation');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');

    const isOpen = nav.classList.contains('open');

    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu': 'Open navigation menu'        
    );
});