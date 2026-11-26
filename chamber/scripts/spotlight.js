const spotlightContainer = document.querySelector(".spotlight-container");

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const qualifiedMembers = data.filter(member => {
        return member.membership === 2 || member.membership === 3;
    });

    const shuffledMembers = qualifiedMembers.sort(() => Math.random() - 0.5);
    const numberOfMembers = Math.floor(Math.random() * 2) + 2;
    const selectedMembers = shuffledMembers.slice(0, numberOfMembers);

    selectedMembers.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        const title = document.createElement("h3");
        title.textContent = member.name;
        card.appendChild(title);

        const img = document.createElement("img");
        img.src = member.image;
        img.alt = member.name;
        card.appendChild(img);

        const description = document.createElement("p");
        description.textContent = member.description;
        card.appendChild(description);

        const link = document.createElement("a");
        link.href = member.website;
        link.textContent = "Visit Website";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        card.appendChild(link);

        spotlightContainer.appendChild(card);
        console.log(member);
    });
}

getMembers();