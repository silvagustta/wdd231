// Courses array
const courses = [
    { subject: "WDD", number: 130, credits: 2, completed: true },
    { subject: "WDD", number: 131, credits: 2, completed: true },
    { subject: "WDD", number: 231, credits: 2, completed: false },
    { subject: "CSE", number: 110, credits: 3, completed: true },
    { subject: "CSE", number: 111, credits: 2, completed: true },
    { subject: "CSE", number: 210, credits: 2, completed: false }
];

// DOM elements
const courseContainer = document.querySelector("#course-container");
const totalCreditsElement = document.querySelector("#total-credits");

// Display courses
function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        const status = course.completed ? "Completed" : "In Progress";

        card.textContent =
            `${course.subject} ${course.number} - ${course.credits} Credits - ${status}`;

        courseContainer.appendChild(card);
    });

    // Calculate total credits
    const totalCredits = courseList.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    totalCreditsElement.textContent = totalCredits;
}

// Buttons
const allButton = document.querySelector("#all-courses");
const wddButton = document.querySelector("#wdd-courses");
const cseButton = document.querySelector("#cse-courses");

// All courses
allButton.addEventListener("click", () => {
    displayCourses(courses);
});

// WDD courses
wddButton.addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

// CSE courses
cseButton.addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

// Initial display
displayCourses(courses);