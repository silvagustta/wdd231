const courses = [
    {
        subject: "WDD",
        number: 130,
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 110,
        credits: 3,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        credits: 2,
        completed: false
    }
];

const courseContainer = document.querySelector("#course-container");
const totalCreditsElement = document.querySelector("#total-credits");

function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        const status = course.completed ? "Completed" : "In Progress";

        card.textContent = `${course.subject} ${course.number} - ${course.credits} Credits - ${status}`;

        courseContainer.appendChild(card);
    });

    const totalCredits = courseList.reduce((total, course) => {
        return total + course.credits;
    }, 0);

    totalCreditsElement.textContent = totalCredits;
}

// Filter buttons
document.querySelector("#all-courses").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd-courses").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.querySelector("#cse-courses").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

// Initial display
displayCourses(courses);