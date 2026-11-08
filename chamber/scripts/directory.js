
// Select HTML elements
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Load chamber members from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const data = await response.json();

        displayMembers(data);

    } catch (error) {
        console.error("Error loading members:", error);
        membersContainer.textContent = "Unable to load business directory.";
    }
}

// Create and display member cards
function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");
        card.classList.add("member-card");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const image = document.createElement("img");
        image.src = member.image;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";

        const description = document.createElement("p");
        description.textContent = member.description;

        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;

        const phone = document.createElement("p");
        phone.textContent = `Phone: ${member.phone}`;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        const membership = document.createElement("p");

        let membershipName;

        switch (member.membership) {
            case 1:
                membershipName = "Member";
                break;
            case 2:
                membershipName = "Silver Member";
                break;
            case 3:
                membershipName = "Gold Member";
                break;
            default:
                membershipName = "Standard Member";
        }

        membership.textContent = `Membership: ${membershipName}`;

        // Add elements to the card
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        // Add card to the page
        membersContainer.appendChild(card);
    });
}

// Switch to Grid view
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

// Switch to List view
listButton.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

// Mobile navigation
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Current year
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

// Last modified date
document.querySelector("#last-modified").textContent =
    document.lastModified;

// Load members when the page starts
getMembers();
