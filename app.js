const ads = [
    // Indian Ads
    {
        id: 'kfw61pqw7GQ',
        title: "Fevicol - The Bus Ad (Classic)",
        views: '8,200,000',
        date: 'Oct 12, 2011',
        description: "The legendary Fevicol advertisement showing the strength of the bond, even on a crowded bus.",
        category: 'Indian'
    },
    {
        id: 'e7JATezA1nY',
        title: "Cadbury Dairy Milk - Cricket (1994)",
        views: '4,500,000',
        date: 'Aug 15, 2012',
        description: "Kuch khaas hai hum sabhi mein. The iconic dancing girl in the cricket stadium.",
        category: 'Indian'
    },
    {
        id: 'ogZGU5C9Pjc',
        title: "Happydent - Tera Din Roshan",
        views: '12,000,000',
        date: 'Jun 20, 2011',
        description: "The sparkling white teeth that light up the whole city. One of the most creative Indian ads.",
        category: 'Indian'
    },
    {
        id: 'sKk_z-9jR4U',
        title: "Amul - Amul Doodh Peeta Hai India",
        views: '3,100,000',
        date: 'Jan 01, 2013',
        description: "The classic Amul milk jingle that every Indian knows by heart.",
        category: 'Indian'
    },
    {
        id: 'm_9mHhU4z7E',
        title: "Hamara Bajaj - The Iconic Jingle",
        views: '2,800,000',
        date: 'Feb 10, 2012',
        description: "The spirit of a rising India captured in a scooter commercial.",
        category: 'Indian'
    },
    {
        id: '4iS9e53u6kU',
        title: "Imperial Blue - Men Will Be Men (Compilation)",
        views: '25,000,000',
        date: 'Mar 15, 2013',
        description: "The humorous 'Men Will Be Men' series that became a cult classic.",
        category: 'Indian'
    },
    {
        id: 'tVpL45s-33I',
        title: "Washing Powder Nirma - Classic Ad",
        views: '5,000,000',
        date: 'Apr 20, 2011',
        description: "The jingle that defined Indian television for decades.",
        category: 'Indian'
    },
    {
        id: 'gHGDN9-Y4No',
        title: "Google Search: Reunion",
        views: '15,000,000',
        date: 'Nov 13, 2013',
        description: "A touching story of two friends separated by the partition, reunited by Google Search.",
        category: 'Indian'
    },
    {
        id: 'Zp_W4kLqLp0',
        title: "Vodafone - ZooZoos (Best of)",
        views: '9,000,000',
        date: 'May 05, 2012',
        description: "The adorable ZooZoos that took India by storm during the IPL.",
        category: 'Indian'
    },
    // Global Ads (Verified Embeds)
    {
        id: 'owGykVbfgUE',
        title: "Old Spice - The Man Your Man Could Smell Like",
        views: '55,000,000',
        date: 'Feb 04, 2010',
        description: "Look at your man, now back to me. Now back at your man, now back to me.",
        category: 'Global'
    },
    {
        id: 'R55e-uHQna0',
        title: "Volkswagen - The Force",
        views: '65,000,000',
        date: 'Feb 02, 2011',
        description: "A little kid tries to use the Force on a VW Passat.",
        category: 'Global'
    },
    {
        id: 'ZUG9qYTJMsI',
        title: "Dollar Shave Club - Our Blades Are F***ing Great",
        views: '28,000,000',
        date: 'Mar 06, 2012',
        description: "The viral ad that launched a subscription empire.",
        category: 'Global'
    },
    {
        id: 'IJNR2EpS0jw',
        title: "Dumb Ways to Die",
        views: '200,000,000',
        date: 'Nov 14, 2012',
        description: "The most adorable public safety announcement ever.",
        category: 'Global'
    },
    {
        id: 'M7FIvfx5J10',
        title: "Volvo Trucks - The Epic Split",
        views: '110,000,000',
        date: 'Nov 13, 2013',
        description: "Jean-Claude Van Damme performs the most epic split ever.",
        category: 'Global'
    }
];

const mockComments = [
    "This is pure gold! I remember watching this on TV.",
    "The creativity back then was on another level.",
    "I'm only here for the jingle. It's stuck in my head now!",
    "Legendary ad. They don't make them like this anymore.",
    "Who else is watching this in 2013?",
    "This ad literally defined my childhood.",
    "Indian ads have so much emotion. Love it!",
    "That Fevicol ad is still the strongest bond ever lol.",
    "Men will be men... so true haha!",
    "Google Reunion ad always makes me cry. 😭"
];

function renderAds() {
    const recommendedGrid = document.getElementById('recommended-grid');
    const popularGrid = document.getElementById('popular-grid');

    if (!recommendedGrid || !popularGrid) return;

    recommendedGrid.innerHTML = '';
    popularGrid.innerHTML = '';

    ads.forEach((ad, index) => {
        const adHtml = `
            <div class="video-card" onclick="playVideo('${ad.id}')">
                <div class="thumbnail">
                    <img src="https://img.youtube.com/vi/${ad.id}/mqdefault.jpg" alt="${ad.title}">
                </div>
                <div class="title">${ad.title}</div>
                <div class="meta">
                    ${ad.views} views • ${ad.date}
                </div>
            </div>
        `;

        if (index < 6) {
            recommendedGrid.innerHTML += adHtml;
        } else {
            popularGrid.innerHTML += adHtml;
        }
    });
}

function playVideo(id) {
    const ad = ads.find(a => a.id === id);
    if (!ad) return;

    // Show player view, hide home view
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('player-view').classList.remove('hidden');

    // Set player content
    const playerContainer = document.getElementById('video-player');
    playerContainer.innerHTML = `
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

    // Set info
    document.getElementById('playing-title').textContent = ad.title;
    document.getElementById('playing-views').textContent = ad.views;
    document.getElementById('playing-description').textContent = ad.description;
    document.getElementById('playing-channel').textContent = ad.category + " Ads Channel";
    
    // Set random stats
    const likePercent = Math.floor(Math.random() * 20) + 80; // 80-100%
    document.getElementById('like-bar').style.width = likePercent + '%';
    document.getElementById('comment-count').textContent = Math.floor(Math.random() * 500) + 100;

    // Render comments
    renderComments();

    // Scroll to top
    window.scrollTo(0, 0);

    // Update URL (mock)
    window.history.pushState({id: id}, ad.title, `?v=${id}`);

    // Update related ads
    const relatedList = document.getElementById('related-ads');
    relatedList.innerHTML = '';
    ads.filter(a => a.id !== id).slice(0, 10).forEach(related => {
        relatedList.innerHTML += `
            <div class="related-item" onclick="playVideo('${related.id}')">
                <div class="related-thumb">
                    <img src="https://img.youtube.com/vi/${related.id}/mqdefault.jpg" alt="${related.title}">
                </div>
                <div class="related-info">
                    <div class="title">${related.title}</div>
                    <div class="meta">${related.views} views</div>
                </div>
            </div>
        `;
    });
}

function renderComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    
    // Shuffle and pick 5 comments
    const shuffled = [...mockComments].sort(() => 0.5 - Math.random());
    shuffled.slice(0, 5).forEach(text => {
        commentsList.innerHTML += `
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <div style="width: 40px; height: 40px; background-color: #eee; border-radius: 2px;"></div>
                <div>
                    <div style="font-weight: bold; font-size: 13px; margin-bottom: 3px;">AdTube User</div>
                    <div style="font-size: 13px; color: #333;">${text}</div>
                </div>
            </div>
        `;
    });
}

// Handle Home link
document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    goHome();
});

function goHome() {
    document.getElementById('home-view').classList.remove('hidden');
    document.getElementById('player-view').classList.add('hidden');
    document.getElementById('video-player').innerHTML = '';
    window.history.pushState({}, 'AdTube', '/');
}

// Sidebar links
document.querySelectorAll('.guide-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.guide-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        if (item.dataset.view === 'home') {
            goHome();
        }
    });
});

// Handle Back/Forward
window.onpopstate = function(event) {
    if (event.state && event.state.id) {
        playVideo(event.state.id);
    } else {
        goHome();
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
