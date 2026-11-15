const spotlightContainer = document.querySelector('#spotlight-container');
const errorContainer = document.querySelector('#spotlight-error');

function shuffle(items) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function membershipName(level) {
    if (Number(level) === 3) return 'Gold Member';
    if (Number(level) === 2) return 'Silver Member';
    return 'Member';
}

function createSpotlight(member) {
    const card = document.createElement('article');
    card.className = 'spotlight-card';

    const logo = document.createElement('img');
    logo.src = member.image;
    logo.alt = `${member.name} logo`;
    logo.loading = 'lazy';
    logo.width = 104;
    logo.height = 76;

    const name = document.createElement('h3');
    name.textContent = member.name;

    const membership = document.createElement('span');
    membership.className = 'membership';
    membership.textContent = membershipName(member.membership);

    const phone = document.createElement('p');
    phone.textContent = member.phone;

    const address = document.createElement('p');
    address.textContent = member.address;

    const website = document.createElement('a');
    website.href = member.website;
    website.textContent = 'Visit website';
    website.target = '_blank';
    website.rel = 'noopener noreferrer';
    website.setAttribute('aria-label', `Visit ${member.name} website (opens in a new tab)`);

    card.append(logo, name, membership, phone, address, website);
    return card;
}

export async function loadSpotlights() {
    if (!spotlightContainer) return;

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error(`Could not load members.json (${response.status})`);

        const members = await response.json();
        const eligibleMembers = members.filter(member =>
            Number(member.membership) === 2 || Number(member.membership) === 3
        );

        const selectedMembers = shuffle(eligibleMembers).slice(0, 3);
        spotlightContainer.replaceChildren();

        if (selectedMembers.length < 2) {
            throw new Error('At least two Silver or Gold members are required in members.json.');
        }

        selectedMembers.forEach(member => {
            spotlightContainer.append(createSpotlight(member));
        });
    } catch (error) {
        console.error('Spotlight error:', error);
        spotlightContainer.textContent = 'Business spotlights could not be loaded. Check data/members.json and run the page with Live Server.';
        errorContainer.textContent = error.message;
    }
}
