const ads = [
    {
        id: 'v_XfVfO1uMc',
        title: "Budweiser - 'Whassup' (1999)",
        views: '1,240,582',
        date: 'Nov 12, 2005',
        description: "Classic Budweiser commercial that started a cultural phenomenon. Whassup!",
        category: 'Classic'
    },
    {
        id: 'owGykVbfgUE',
        title: "Old Spice - The Man Your Man Could Smell Like",
        views: '850,231',
        date: 'Oct 05, 2005',
        description: "Look at your man, now back to me. Now back at your man, now back to me.",
        category: 'Humor'
    },
    {
        id: 'R7S67fXv9f8',
        title: "Coca-Cola - Happiness Factory",
        views: '420,119',
        date: 'Dec 01, 2005',
        description: "A look inside the magical world of a Coca-Cola vending machine.",
        category: 'Fantasy'
    },
    {
        id: 'fxS_wL4q8_Y',
        title: "Pepsi - Gladiator ft. Britney, Beyonce, Pink",
        views: '3,102,445',
        date: 'Aug 15, 2005',
        description: "The ultimate arena battle featuring the queens of pop.",
        category: 'Music'
    },
    {
        id: 'qX9v9m9R6qE',
        title: "Skittles - Touch the Rainbow",
        views: '210,000',
        date: 'Sep 22, 2005',
        description: "Everything I touch turns to Skittles.",
        category: 'Surreal'
    },
    {
        id: 'vL_3eO0-Lyo',
        title: "Apple - Get a Mac: Virus",
        views: '1,005,000',
        date: 'May 10, 2005',
        description: "Hello, I'm a Mac. And I'm a PC.",
        category: 'Tech'
    },
    {
        id: 'I07xDdFE6ko',
        title: "Honda - The Cog (2003)",
        views: '540,000',
        date: 'Jun 15, 2005',
        description: "An incredible Rube Goldberg machine made entirely of Honda Accord parts.",
        category: 'Creative'
    },
    {
        id: 'Zbe8QZ_D-tU',
        title: "Cadbury's Gorilla",
        views: '1,200,450',
        date: 'Jul 20, 2005',
        description: "A gorilla playing the drums to Phil Collins. Pure advertising gold.",
        category: 'Music'
    },
    {
        id: 'W_f0Y1E0Y4k',
        title: "Geico - Hump Day",
        views: '900,000',
        date: 'Aug 05, 2005',
        description: "Guess what day it is! GUESS! WHAT! DAY! IT! IS!",
        category: 'Humor'
    }
];

function renderAds() {
    const featuredGrid = document.getElementById('featured-ads-grid');
    const recentGrid = document.getElementById('recent-ads-grid');
    const liveWatching = document.getElementById('live-watching');

    featuredGrid.innerHTML = '';
    recentGrid.innerHTML = '';
    liveWatching.innerHTML = '';

    ads.forEach((ad, index) => {
        const adHtml = `
            <div class="video-item" onclick="playVideo('${ad.id}')">
                <div class="thumbnail">
                    <img src="https://img.youtube.com/vi/${ad.id}/mqdefault.jpg" alt="${ad.title}">
                </div>
                <div class="video-info">
                    <a href="?v=${ad.id}" class="video-title" onclick="event.preventDefault(); playVideo('${ad.id}')">${ad.title}</a>
                    <span class="video-meta">${ad.views} views</span>
                </div>
            </div>
        `;

        if (index < 3) {
            featuredGrid.innerHTML += adHtml;
        } else {
            recentGrid.innerHTML += adHtml;
        }

        // Live watching sidebar
        liveWatching.innerHTML += `<li><a href="?v=${ad.id}" onclick="event.preventDefault(); playVideo('${ad.id}')">${ad.title}</a></li>`;
    });
}

function playVideo(id) {
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    // Show player view, hide home view
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('home-sidebar').classList.add('hidden');
    document.getElementById('player-view').classList.remove('hidden');

    // Set player content
    const playerContainer = document.getElementById('video-player');
    playerContainer.innerHTML = `
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

    // Set info
    document.getElementById('playing-title').textContent = ad.title;
    document.getElementById('playing-date').textContent = ad.date;
    document.getElementById('playing-views').textContent = ad.views;
    document.getElementById('playing-description').textContent = ad.description;

    // Scroll to top
    window.scrollTo(0, 0);

    // Update URL (mock)
    window.history.pushState({id: id}, ad.title, `?v=${id}`);

    // Update sidebar column in player view
    const sidebarCol = document.getElementById('sidebar-column');
    sidebarCol.innerHTML = '<div class="sidebar-box"><h3>Related Ads</h3><ul id="related-ads"></ul></div>';
    const relatedList = document.getElementById('related-ads');
    ads.filter(a => a.id !== id).slice(0, 5).forEach(related => {
        relatedList.innerHTML += `<li><a href="?v=${related.id}" onclick="event.preventDefault(); playVideo('${related.id}')">${related.title}</a></li>`;
    });
}

// Handle Home link
document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('home-view').classList.remove('hidden');
    document.getElementById('home-sidebar').classList.remove('hidden');
    document.getElementById('player-view').classList.add('hidden');
    document.getElementById('video-player').innerHTML = '';
    window.history.pushState({}, 'AdTube', '/');
});

// Handle Back/Forward
window.onpopstate = function(event) {
    if (event.state && event.state.id) {
        playVideo(event.state.id);
    } else {
        document.getElementById('home-view').classList.remove('hidden');
        document.getElementById('home-sidebar').classList.remove('hidden');
        document.getElementById('player-view').classList.add('hidden');
        document.getElementById('video-player').innerHTML = '';
    }
};

// Initialize
renderAds();

// Check for URL param on load
const urlParams = new URLSearchParams(window.location.search);
const v = urlParams.get('v');
if (v) {
    playVideo(v);
}
