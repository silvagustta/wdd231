// Current year
const currentYear = new Date().getFullYear();

document.querySelector("#currentYear").textContent = currentYear;

// Last modified date
document.querySelector("#lastModified").textContent =
    document.lastModified;

// Responsive navigation
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-navigation");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});