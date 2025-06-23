// Configuration
const CONFIG = {
    mapboxToken: 'pk.eyJ1IjoiYXNpYWFtb2RlbyIsImEiOiJjbGFiMHE4eWUwY3piM3BwZWd5ajRoajBuIn0.Bu2rSIQlVd5_gVI13VprSA', // Replace with your actual token
    mapCenter: [-0.1276, 51.5074], // London center
    mapZoom: 11
};

// Sample events data
const events = [
    {
        id: 1,
        name: "Strapped x Carabiner",
        venue: "Signature Brew",
        time: "18:00-21:00",
        date: "Jul 4",
        price: "£12 - £15",
        tags: ["lesbian", "party"],
        coordinates: [-0.042085, 51.592789]
    },
    {
        id: 2,
        name: "Popola",
        venue: "Signature Brew",
        time: "19:00-23:00",
        date: "Today",
        price: "£10",
        tags: ["bisexual", "party"],
        coordinates: [-0.0558, 51.5614]
    },
    {
        id: 3,
        name: "HOWL",
        venue: "Hackney Wick",
        time: "14:00-18:00",
        date: "Today",
        price: "Free",
        tags: ["flinta", "community"],
        coordinates: [-0.0433, 51.5444]
    },
    {
        id: 4,
        name: "Junk",
        venue: "Low Profile Studios",
        time: "22:00-05:00",
        date: "Today",
        price: "£15",
        tags: ["trans", "party"],
        coordinates: [-0.0845, 51.5287]
    },
    {
        id: 5,
        name: "Letherette",
        venue: "Avalon Cafe",
        time: "20:00-02:00",
        date: "Today",
        price: "£8",
        tags: ["lesbian", "music"],
        coordinates: [-0.1276, 51.5074]
    }
];

// Global variables
let map;
let currentFilter = 'all';

// Initialize the application
function init() {
    initializeMap();
    setupEventListeners();
}

// Initialize Mapbox map
function initializeMap() {
    mapboxgl.accessToken = CONFIG.mapboxToken;
    
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: CONFIG.mapCenter,
        zoom: CONFIG.mapZoom
    });
    
    map.on('load', () => {
        filterEvents('all');
    });
}

// Add markers to map
function addMarkers(eventsToShow) {
    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    eventsToShow.forEach(event => {
        const el = document.createElement('div');
        el.className = 'marker';
        
        new mapboxgl.Marker(el)
            .setLngLat(event.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML(createPopupHTML(event)))
            .addTo(map);
    });
}

// Create popup HTML
function createPopupHTML(event) {
    return `
        <div>
            <h3>${event.name}</h3>
            <p><strong>${event.venue}</strong></p>
            <p>${event.time} • ${event.date}</p>
            <p>${event.price}</p>
        </div>
    `;
}

// Render events list
function renderEvents(eventsToShow) {
    const eventsList = document.getElementById('events-list');
    
    if (eventsToShow.length === 0) {
        eventsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No events found for this filter.</p>';
        return;
    }
    
    eventsList.innerHTML = eventsToShow.map(event => createEventCardHTML(event)).join('');
}

// Create event card HTML
function createEventCardHTML(event) {
    const tagsHTML = event.tags.map(tag => `<span class="tag ${tag}">${tag}</span>`).join('');
    
    return `
        <div class="event-card" onclick="flyToEvent(${event.coordinates[0]}, ${event.coordinates[1]})">
            <div class="event-name">${event.name}</div>
            <div class="event-details">${event.venue}  </div>
            <div class="event-details">${event.date} •  ${event.time} • ${event.price}</div>
            <div class="event-tags">${tagsHTML}</div>
        </div>
    `;
}

// Filter events based on selected filter
function filterEvents(filter) {
    let filteredEvents = events;
    
    if (filter !== 'all') {
        if (filter === 'today') {
            filteredEvents = events.filter(event => event.date === 'Today');
        } else {
            filteredEvents = events.filter(event => event.tags.includes(filter));
        }
    }
    
    renderEvents(filteredEvents);
    addMarkers(filteredEvents);
}

// Fly to event location on map
function flyToEvent(lng, lat) {
    map.flyTo({
        center: [lng, lat],
        zoom: 15,
        duration: 1000
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter button event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
}

// Handle filter button clicks
function handleFilterClick(event) {
    const btn = event.target;
    
    // Update active filter button
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    
    // Update current filter and apply it
    currentFilter = btn.dataset.filter;
    filterEvents(currentFilter);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);