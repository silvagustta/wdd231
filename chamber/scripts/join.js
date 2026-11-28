// Membership modal functionality
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});

// Close modal when clicking outside its content
document.querySelectorAll("dialog").forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});

// Record form submission date and time
const membershipForm = document.querySelector("#membership-form");

membershipForm.addEventListener("submit", () => {
    const timestamp = document.querySelector("#timestamp");

    timestamp.value = new Date().toISOString();
});