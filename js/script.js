// Global variables
let map;
let currentFilter = 'all';
let currentView = 'list'; // 'list' or 'detail'
let currentEvent = null;
let isMobile = window.innerWidth <= 768;
let mobileViewMode = 'list'; // 'list' or 'map' for mobile
let selectedTags = []; // Track selected tags for filtering

// Mobile view state
let isDragging = false;
let startY, startBottom;

// Initialize the application
async function init() {
    await geocodeAllEvents();
    initializeMap();
    renderEvents(events);
    setupEventListeners();
    
    // Initialize mobile view properly
    if (isMobile) {
        setupMobileView();
    }
    
    // Initialize tag filter
    setupTagFilterDropdown();
    
    // Setup enhanced click tracking
    setupEnhancedClickTracking();
    
    // Set up automatic refresh to remove ended events
    setupAutoRefresh();
}

// Setup mobile view functionality
function setupMobileView() {
    // Ensure map is hidden by default on mobile
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.style.display = 'none';
    }
    
    // Set initial mobile view mode
    mobileViewMode = 'list';
    
    // Setup scroll transition for mobile
    setupScrollTransition();
}

// Setup smooth scroll transition for mobile
function setupScrollTransition() {
    if (!isMobile) return;
    
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    
    // Add scroll listener to events list
    function handleScroll() {
        if (currentView !== 'list') return;
        
        const eventsList = document.getElementById('events-list');
        if (!eventsList) return;
        
        const scrollTop = eventsList.scrollTop;
        const scrollThreshold = 100; // Start transition after 100px scroll
        
        // Calculate transition progress (0 to 1)
        const progress = Math.min(scrollTop / scrollThreshold, 1);
        
        // Apply smooth transition
        if (progress > 0) {
            sidebar.style.height = `${50 + (50 * progress)}vh`;
            sidebar.style.transition = 'height 0.3s ease-out';
            
            const map = document.getElementById('map');
            map.style.height = `${50 - (50 * progress)}vh`;
            map.style.transition = 'height 0.3s ease-out';
        }
    }
    
    // Setup scroll listener when events list is created
    const observer = new MutationObserver(() => {
        const eventsList = document.getElementById('events-list');
        if (eventsList && currentView === 'list') {
            eventsList.addEventListener('scroll', handleScroll);
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}
// Geocode all events that don't have coordinates
async function geocodeAllEvents() {
    const eventsNeedingGeocode = events.filter(event => !event.coordinates);
    
    for (const event of eventsNeedingGeocode) {
        try {
            const coords = await geocodeAddress(event.address);
            event.coordinates = coords;
        } catch (error) {
            console.error(`Failed to geocode ${event.name}:`, error);
            // Fallback to London center if geocoding fails
            event.coordinates = CONFIG.mapCenter;
        }
    }
    
    
    // Now that all events have coordinates, show them
    filterEvents('all');
}

// Geocode a single address using Mapbox Geocoding API
async function geocodeAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${CONFIG.mapboxToken}&country=GB&proximity=-0.1276,51.5074`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
            return data.features[0].center; // [longitude, latitude]
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
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
    
    map.on('load', async () => {
        // Wait for geocoding to complete before showing events
        if (events.some(event => !event.coordinates)) {
            // Events are still being geocoded, filterEvents will be called by geocodeAllEvents
            return;
        }
        filterEvents('all');
    });
}

// Add markers to map
function addMarkers(eventsToShow) {
    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Group events by location (same coordinates)
    const locationGroups = groupEventsByLocation(eventsToShow);
    
    locationGroups.forEach(group => {
        const el = document.createElement('div');
        
        if (group.events.length === 1) {
            // Single event marker - no direct click handler, only popup
            el.className = 'marker';
        } else {
            // Multiple events marker with count
            el.className = 'marker-cluster';
            el.innerHTML = `<span class="marker-count">${group.events.length}</span>`;
        }
        
        new mapboxgl.Marker(el)
            .setLngLat(group.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false })
                .setHTML(createClusterPopupHTML(group)))
            .addTo(map);
    });
}

// Group events by location
function groupEventsByLocation(events) {
    const groups = [];
    const tolerance = 0.0001; // Small tolerance for coordinate matching
    
    events.forEach(event => {
        if (!event.coordinates) return;
        
        // Find existing group with same location
        const existingGroup = groups.find(group => 
            Math.abs(group.coordinates[0] - event.coordinates[0]) < tolerance &&
            Math.abs(group.coordinates[1] - event.coordinates[1]) < tolerance
        );
        
        if (existingGroup) {
            existingGroup.events.push(event);
        } else {
            groups.push({
                coordinates: event.coordinates,
                events: [event]
            });
        }
    });
    
    return groups;
}

// Create popup HTML for clustered events
function createClusterPopupHTML(group) {
    if (group.events.length === 1) {
        const event = group.events[0];
        const viewDetailsFunction = isMobile ? `showEventDetailFromMap(${event.id})` : `showEventDetail(${event.id})`;
        const imageHTML = isMobile && event.image ? `
            <div style="margin-bottom: 12px;">
                <img src="${event.image}" alt="${event.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            </div>
        ` : '';
        
        return `
            <div class="popup-single">
                ${imageHTML}
                <h3>${event.name}</h3>
                <p><strong>${event.venue}</strong></p>
                <p>${event.time} • ${event.date}</p>
                <p>${event.price}</p>
                <button onclick="${viewDetailsFunction}; trackMapInteraction('Popup View Details', '${event.name}')" class="popup-btn">View Details</button>
            </div>
        `;
    } else {
        const eventsHTML = group.events.map(event => {
            const viewDetailsFunction = isMobile ? `showEventDetailFromMap(${event.id})` : `showEventDetail(${event.id})`;
            const imageHTML = isMobile && event.image ? `
                <img src="${event.image}" alt="${event.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 8px; float: left;">
            ` : '';
            
            return `
                <div class="popup-event" onclick="${viewDetailsFunction}; trackMapInteraction('Popup Event Click', '${event.name}')">
                    ${imageHTML}
                    <div style="margin-left: ${isMobile && event.image ? '48px' : '0'};">
                        <div class="popup-event-name">${event.name}</div>
                        <div class="popup-event-time">${event.date} • ${event.time}</div>
                        <div class="popup-event-price">${event.price}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="popup-cluster">
                <h3>${group.events[0].venue}</h3>
                <p>${group.events.length} events at this location</p>
                <div class="popup-events">
                    ${eventsHTML}
                </div>
            </div>
        `;
    }
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
    const tagsHTML = (event.tags || []).slice(0, 5).map(tag => `<span class="tag">${tag}</span>`).join('');
    return `
    <div class="event-card card-media" onclick="showEventDetail(${event.id})">
      <div class="card-media-object-container">
        <div class="card-media-object" style="background-image: url('${event.image}');"></div>
        ${event.sellingFast ? '<span class="card-media-object-tag subtle">Selling Fast</span>' : ''}
      </div>
      <div class="card-media-body">
        <div class="card-media-body-top">
          <span class="subtle">${event.date}, ${event.time}</span>
          <span class="event-price-top subtle ">${event.price}</span>
        </div>
        <span class="card-media-body-heading">${event.name}</span>
        <div class="card-media-body-supporting-bottom">
          <span class="card-media-body-supporting-bottom-text subtle">${event.venue}</span>
          
        </div>
        <div class="card-media-body-supporting-bottom card-media-body-supporting-bottom-reveal">
          <span class="card-media-body-supporting-bottom-text subtle">${tagsHTML}</span>
        </div>
      </div>
    </div>
    `;
}

// Helper function to convert date strings to comparable dates
function parseEventDate(dateString) {
    if (dateString === 'Today') {
        return new Date(); // Today's date
    }
    
    // Handle formats like "Jun 4", "Jul 5"
    const currentYear = new Date().getFullYear();
    const dateWithYear = `${dateString} ${currentYear}`;
    const parsedDate = new Date(dateWithYear);
    
    // If the parsed date is invalid, return a far future date to put it at the end
    if (isNaN(parsedDate.getTime())) {
        return new Date('2099-12-31');
    }
    
    return parsedDate;
}

// Function to check if an event has ended
function isEventEnded(event) {
    const eventDate = parseEventDate(event.date);
    const now = new Date();
    
    // If event is not today, check if the date has passed
    if (eventDate.getTime() !== new Date().setHours(0, 0, 0, 0)) {
        return eventDate < new Date().setHours(0, 0, 0, 0);
    }
    
    // If event is today, check if the end time has passed
    const timeMatch = event.time.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
        const endHour = parseInt(timeMatch[1]);
        const endMinute = parseInt(timeMatch[2]);
        
        // Handle events that go past midnight (like "22:00-4:00")
        let endTime = new Date();
        endTime.setHours(endHour, endMinute, 0, 0);
        
        // If end time is earlier than start time, it means the event goes past midnight
        // In this case, add 24 hours to the end time
        if (endHour < 12) { // Assuming events don't end before noon
            endTime.setDate(endTime.getDate() + 1);
        }
        
        return now > endTime;
    }
    
    // If we can't parse the time, assume event ends at 11:59 PM
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    return now > endOfDay;
}

// Function to filter out ended events
function filterOutEndedEvents(eventsArray) {
    return eventsArray.filter(event => !isEventEnded(event));
}

// Add this new function to check if a date is in the current week
function isDateInCurrentWeek(dateString) {
    const eventDate = parseEventDate(dateString);
    const today = new Date();
    
    // Get start of current week (Monday)
    const weekStart = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday (0), go back 6 days; otherwise go back (dayOfWeek - 1) days
    weekStart.setDate(today.getDate() - daysToMonday);
    weekStart.setHours(0, 0, 0, 0);
    
    // Get end of current week (Sunday)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    return eventDate >= weekStart && eventDate <= weekEnd;
}

// Update the filterEvents function to handle 'this-week' and tag filtering
function filterEvents(filter) {
    let filteredEvents = events;
    
    // First, filter out ended events automatically
    filteredEvents = filterOutEndedEvents(filteredEvents);
    
    if (filter !== 'all') {
        if (filter === 'today') {
            filteredEvents = filteredEvents.filter(event => isEventToday(event.date));
        } else if (filter === 'this-week') {
            filteredEvents = filteredEvents.filter(event => isDateInCurrentWeek(event.date));
        } else {
            // Filter by type (party, social, workshop)
            filteredEvents = filteredEvents.filter(event => event.type === filter);
        }
    }
    
    // Apply tag filtering if tags are selected
    if (selectedTags.length > 0) {
        filteredEvents = filteredEvents.filter(event => {
            if (!event.tags) return false;
            // Event must have at least one of the selected tags
            return selectedTags.some(tag => event.tags.includes(tag));
        });
    }
    
    // Sort events chronologically (Today first, then Jun 4, Jul 5, etc.)
    filteredEvents.sort((a, b) => {
        const dateA = parseEventDate(a.date);
        const dateB = parseEventDate(b.date);
        return dateA - dateB;
    });
    
    // Rebuild tag dropdown based on currently visible events and prune stale selections
    setupTagFilterDropdown(filteredEvents);
    updateTagsFilterButton();

    renderEvents(filteredEvents);
    addMarkers(filteredEvents);
}

// Add this new function to check if a date is today
function isEventToday(dateString) {
    const eventDate = parseEventDate(dateString);
    const today = new Date();
    
    // Compare year, month, and day
    return eventDate.getFullYear() === today.getFullYear() &&
           eventDate.getMonth() === today.getMonth() &&
           eventDate.getDate() === today.getDate();
}

// Show event detail view - Updated with scroll to top
function showEventDetail(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    // Track the event card click
    trackEventCardClick(event);
    
    currentEvent = event;
    currentView = 'detail';
    
    // Fly to event location on map
    if (event.coordinates) {
        flyToEvent(event.coordinates[0], event.coordinates[1]);
    }
    
    // Replace sidebar content with event detail
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = createEventDetailHTML(event);
    
    // FIX: Scroll to top of the sidebar when opening event detail
    sidebar.scrollTop = 0;
    
    // MOBILE FIX: Also scroll the main document/window to top on mobile
    if (isMobile) {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        
        // If we're in map view, switch back to list view to show event detail
        if (mobileViewMode === 'map') {
            mobileViewMode = 'list';
            showMobileListView();
        }
    }
}

// Create detailed event view HTML
function createEventDetailHTML(event) {
    const allTags = [
        ...event.tags.map(tag => `<span class=\"tag\">${tag}</span>`),
        ...(event.generes && event.generes.length > 0 ? event.generes.map(genre => `<span class=\"tag genre\">${genre}</span>`) : []),
        ...(event.age ? [`<span class=\"tag age\">${event.age}</span>`] : [])
    ].join('');
    
    // Create image container with type tag overlay
    const imageHTML = event.image ? `
        <div class=\"event-detail-image-container\">
            <img src=\"${event.image}\" alt=\"${event.name}\" class=\"event-detail-image\">
            <div class=\"event-detail-type-overlay\">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</div>
        </div>
    ` : '';
    
    // Format description with proper line breaks
    const formattedDescription = event.description ? event.description.replace(/\n/g, '<br>') : '';
    
    return `
        <div class=\"event-detail\">
            <button class=\"back-btn-sharp\" onclick=\"showEventsList()\">← Back</button>
            ${imageHTML}
            <div class=\"event-detail-title-section\">
                <h2 class=\"event-detail-title\">${event.name}</h2>
            </div>
            <div class=\"event-detail-content\">
                <div class=\"event-detail-info\">
                    <div class=\"event-detail-venue-section\">
                        <div class=\"event-detail-venue\">${event.venue} • 
                            <a href=\"https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}\" target=\"_blank\" class=\"venue-link\">
                                ${event.address}
                            </a>
                        </div> 
                        <div class=\"event-detail-datetime\">${event.date} • ${event.time}</div>
                    </div>
                    <div class=\"event-detail-price\">${event.price}</div>
                </div>
                <div class=\"event-detail-actions\">
                    ${event.ticket_link ? `<a href=\"${event.ticket_link}\" target=\"_blank\" class=\"action-btn ticket-btn\">Get Tickets</a>` : ''}
                    ${event.website_link ? `<a href=\"${event.website_link}\" target=\"_blank\" class=\"action-btn website-btn\">Website</a>` : ''}
                </div>
                <div class=\"event-detail-tags\" style=\"margin-top: 24px;\">
                    ${allTags}
                </div>
                ${formattedDescription ? `<div class=\"event-detail-description\"><h3>About</h3><p>${formattedDescription}</p></div>` : ''}
            </div>
            ${event.address ? `
                <div class="event-detail-map-preview">
                    <iframe
                        width="100%"
                        height="200"
                        frameborder="0"
                        style="border:0; border-radius: 8px; margin-top: 24px;"
                        src="https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed"
                        allowfullscreen>
                    </iframe>
                </div>
            ` : ''}
        </div>
    `;
}

// Show events list view - Updated with scroll to top
function showEventsList() {
    currentView = 'list';
    currentEvent = null;

    map.flyTo({
        center: CONFIG.mapCenter,
        zoom: CONFIG.mapZoom,
        duration: 1000
    });
    
    // Restore original sidebar content
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = `
        <div class="header">
            <h1>On My Gaydar</h1>
            <div class="header-subtitle-section">
                <h5>The best local queer events, updated daily. <a href="https://mailchi.mp/54e006ea8469/gaydar-newsletter-sign-up" target="_blank" class="newsletter-link">Sign up for weekly roundups</a></h5>
            </div>
            <div class="filters">
                <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
                <button class="filter-btn tags-filter-btn ${selectedTags.length > 0 ? 'active' : ''}" onclick="toggleTagFilter()">
                    🔍 Tags ${selectedTags.length > 0 ? `(${selectedTags.length})` : ''}
                </button>
                <button class="filter-btn ${currentFilter === 'this-week' ? 'active' : ''}" data-filter="this-week">This Week</button>
                <button class="filter-btn ${currentFilter === 'today' ? 'active' : ''}" data-filter="today">Today</button>
                <button class="filter-btn ${currentFilter === 'party' ? 'active' : ''}" data-filter="party">Party</button>
                <button class="filter-btn ${currentFilter === 'social' ? 'active' : ''}" data-filter="social">Social</button>
                <button class="filter-btn ${currentFilter === 'workshop' ? 'active' : ''}" data-filter="workshop">Workshop</button>
            </div>
            <div class="tag-filter-dropdown-container"></div>
            ${isMobile ? `
                <div class="mobile-view-toggle">
                    <button class="view-toggle-btn" data-view="map">
                        <span class="toggle-icon">🗺️</span>
                        <span class="toggle-text">Map View</span>
                    </button>
                </div>
            ` : ''}
        </div>
        <div class="events-list" id="events-list">
            <!-- Events will be populated here -->
        </div>
    `;
    
    // FIX: Scroll to top when returning to events list
    sidebar.scrollTop = 0;
    
    // MOBILE FIX: Also scroll the main document/window to top on mobile
    if (isMobile) {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    
    // Re-setup event listeners and show events
    setupEventListeners();
    filterEvents(currentFilter);
}

// Get directions to venue
function getDirections(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(url, '_blank');
}

// Setup event listeners
function setupEventListeners() {
    // Filter button event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (!btn.classList.contains('tags-filter-btn')) {
            btn.addEventListener('click', handleFilterClick);
        }
    });
    
    // Mobile view toggle event listeners
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });
    
    // Setup tag filter dropdown
    setupTagFilterDropdown();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
    });
    
    // Ensure mobile view is properly set up if we're on mobile
    if (isMobile && !document.querySelector('.mobile-view-toggle')) {
        // If mobile toggle is missing, re-render the header
        const header = document.querySelector('.header');
        if (header && currentView === 'list') {
            showEventsList();
        }
    }
}

// Setup tag filter dropdown functionality
function setupTagFilterDropdown(sourceEvents = null) {
    const container = document.querySelector('.tag-filter-dropdown-container');
    if (!container) return;
    
    // Compute available tags from provided list or all events
    const uniqueTags = getAllUniqueTags(sourceEvents || events);

    // Prune selected tags that are no longer available
    selectedTags = selectedTags.filter(tag => uniqueTags.includes(tag));

    // Rebuild dropdown fresh
    container.innerHTML = '';
    const dropdown = createTagFilterDropdown(uniqueTags);
    container.appendChild(dropdown);
    
    // Add event listeners
    dropdown.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-tag-filter')) {
            toggleTagFilter();
        } else if (e.target.classList.contains('clear-tags-btn')) {
            clearTagSelections();
        } else if (e.target.classList.contains('apply-tags-btn')) {
            handleTagSelection();
            toggleTagFilter();
            filterEvents(currentFilter);
            updateTagsFilterButton();
        } else if (e.target.type === 'checkbox') {
            // Handle individual checkbox changes
            setTimeout(() => {
                handleTagSelection();
                updateTagsFilterButton();
            }, 0);
        }
    });
    
    // Close dropdown when clicking outside (attach once)
    if (!window._tagDropdownOutsideHandlerAdded) {
        document.addEventListener('click', (e) => {
            const currentDropdown = document.querySelector('.tag-filter-dropdown');
            if (currentDropdown && !currentDropdown.contains(e.target) && !e.target.classList.contains('tags-filter-btn')) {
                currentDropdown.style.display = 'none';
            }
        });
        window._tagDropdownOutsideHandlerAdded = true;
    }
}

// Update the tags filter button text
function updateTagsFilterButton() {
    const tagsBtn = document.querySelector('.tags-filter-btn');
    if (tagsBtn) {
        tagsBtn.textContent = `🔍 Tags ${selectedTags.length > 0 ? `(${selectedTags.length})` : ''}`;
        tagsBtn.classList.toggle('active', selectedTags.length > 0);
    }
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

// Handle mobile view toggle
function handleViewToggle(event) {
    const btn = event.target.closest('.view-toggle-btn');
    if (!btn) return;
    
    // Only handle map view since we only have one button now
    showMobileMapView();
}

// Show mobile map view
function showMobileMapView() {
    const container = document.querySelector('.container');
    const mapElement = document.getElementById('map');
    const sidebar = document.querySelector('.sidebar');
    
    if (!mapElement || !sidebar) {
        console.error('Map or sidebar element not found');
        return;
    }
    
  
    
    // Show map, hide sidebar
    mapElement.style.display = 'block';
    sidebar.style.display = 'none';
    
    // Ensure map takes full screen
    mapElement.style.height = '100vh';
    mapElement.style.width = '100vw';
    mapElement.style.position = 'fixed';
    mapElement.style.top = '0';
    mapElement.style.left = '0';
    mapElement.style.zIndex = '1000';
    
    // Add back button to map view
    if (!document.querySelector('.mobile-map-back-btn')) {
        const backBtn = document.createElement('button');
        backBtn.className = 'mobile-map-back-btn';
        backBtn.innerHTML = '← Back to List';
        backBtn.onclick = () => {
            mobileViewMode = 'list';
            showMobileListView();
        };
        document.body.appendChild(backBtn);
    }
    
    // Resize map to fit new container
    if (map) {
        setTimeout(() => {
            map.resize();
        }, 100);
    }
}

// Show mobile list view
function showMobileListView() {
    const container = document.querySelector('.container');
    const mapElement = document.getElementById('map');
    const sidebar = document.querySelector('.sidebar');
    
    if (!mapElement || !sidebar) {
        console.error('Map or sidebar element not found');
        return;
    }
    
    // Hide map, show sidebar
    mapElement.style.display = 'none';
    mapElement.style.position = 'static';
    mapElement.style.top = 'auto';
    mapElement.style.left = 'auto';
    mapElement.style.zIndex = 'auto';
    sidebar.style.display = 'block';
    
    // Restore sidebar to full height
    sidebar.style.height = '100vh';
    sidebar.style.width = '100%';
    
    // Remove back button from map view
    const backBtn = document.querySelector('.mobile-map-back-btn');
    if (backBtn) {
        backBtn.remove();
    }
    
    // Ensure events are displayed
    if (currentView === 'list') {
        filterEvents(currentFilter);
    }
}

// Fly to event location on map
function flyToEvent(lng, lat) {
    map.flyTo({
        center: [lng, lat],
        zoom: 15,
        duration: 1000
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Make mobile functions globally accessible
window.isMobile = isMobile;

// Handle window resize
window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    
    // Update global variables
    window.isMobile = isMobile;
    
    if (wasMobile !== isMobile) {
        if (isMobile) {
            // Initialize mobile view when switching to mobile
            setupMobileView();
            // Reset to list view when switching to mobile
            mobileViewMode = 'list';
            showMobileListView();
        } else {
            // Clean up mobile view when switching to desktop
            const backBtn = document.querySelector('.mobile-map-back-btn');
            if (backBtn) {
                backBtn.remove();
            }
            
            // Reset map display for desktop
            const mapElement = document.getElementById('map');
            if (mapElement) {
                mapElement.style.display = 'block';
                mapElement.style.position = 'static';
                mapElement.style.top = 'auto';
                mapElement.style.left = 'auto';
                mapElement.style.zIndex = 'auto';
                mapElement.style.height = '100vh';
                mapElement.style.width = 'auto';
            }
            
            // Reset sidebar for desktop
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.style.display = 'block';
                sidebar.style.width = '600px';
                sidebar.style.height = '100vh';
            }
            
            // Reset mobile view mode
            mobileViewMode = 'list';
            
            // Resize map for desktop
            if (map) {
                setTimeout(() => {
                    map.resize();
                }, 100);
            }
        }
    }
});

// Show event detail from map view (mobile)
function showEventDetailFromMap(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    // Track map-to-detail navigation
    trackMapInteraction('Map to Detail Navigation', event.name);
    
    // Switch to list view first
    mobileViewMode = 'list';
    showMobileListView();
    
    // Show event detail immediately
    showEventDetail(eventId);
}

// Function to extract all unique tags from events
function getAllUniqueTags(sourceEvents = events) {
    const allTags = [];
    sourceEvents.forEach(event => {
        if (event.tags) {
            event.tags.forEach(tag => {
                if (!allTags.includes(tag)) {
                    allTags.push(tag);
                }
            });
        }
    });
    return allTags.sort(); // Sort alphabetically
}

// Function to create tag filter dropdown
function createTagFilterDropdown(uniqueTags) {
    const uniqueTagsComputed = uniqueTags || getAllUniqueTags();
    const dropdown = document.createElement('div');
    dropdown.className = 'tag-filter-dropdown';
    dropdown.style.display = 'none';
    
    const tagList = uniqueTagsComputed.map(tag => `
        <div class="tag-filter-option" data-tag="${tag}">
            <input type="checkbox" id="tag-${tag}" ${selectedTags.includes(tag) ? 'checked' : ''}>
            <label for="tag-${tag}">${tag}</label>
        </div>
    `).join('');
    
    dropdown.innerHTML = `
        <div class="tag-filter-header">
            <h4>Filter by Tags</h4>
            <button class="close-tag-filter">×</button>
        </div>
        <div class="tag-filter-content">
            ${tagList}
        </div>
        <div class="tag-filter-actions">
            <button class="clear-tags-btn">Clear All</button>
            <button class="apply-tags-btn">Apply Filters</button>
        </div>
    `;
    
    return dropdown;
}

// Function to show/hide tag filter dropdown
function toggleTagFilter() {
    const dropdown = document.querySelector('.tag-filter-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

// Function to handle tag selection
function handleTagSelection() {
    const checkboxes = document.querySelectorAll('.tag-filter-option input[type="checkbox"]');
    selectedTags = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTags.push(checkbox.id.replace('tag-', ''));
        }
    });
}

// Function to clear all tag selections
function clearTagSelections() {
    selectedTags = [];
    const checkboxes = document.querySelectorAll('.tag-filter-option input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

// Set up automatic refresh to remove ended events
function setupAutoRefresh() {
    // Check for ended events every minute
    setInterval(() => {
        // Only refresh if we're in list view (not in event detail)
        if (currentView === 'list') {
            filterEvents(currentFilter);
        }
    }, 60000); // Check every minute
    
    // Also check when the page becomes visible (user returns to tab)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && currentView === 'list') {
            filterEvents(currentFilter);
        }
    });
}

// Google Analytics 4 Click Tracking Functions
function trackClick(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
        console.log('GA4 Event tracked:', eventName, parameters); // Debug log
    } else {
        console.log('gtag not available, would track:', eventName, parameters); // Debug log
    }
}

function trackEventCardClick(event) {
    trackClick('event_card_click', {
        event_name: event.name,
        event_id: event.id,
        event_type: event.type,
        venue: event.venue
    });
}

function trackFilterClick(filterType) {
    trackClick('filter_click', {
        filter_type: filterType
    });
}

function trackTagFilterClick(tagName) {
    trackClick('tag_filter_click', {
        tag_name: tagName
    });
}

function trackActionButtonClick(buttonType, eventName) {
    trackClick('action_button_click', {
        button_type: buttonType,
        event_name: eventName
    });
}

function trackMapInteraction(interactionType, details = null) {
    trackClick('map_interaction', {
        interaction_type: interactionType,
        details: details
    });
}

function trackNavigationClick(navigationType) {
    trackClick('navigation_click', {
        navigation_type: navigationType
    });
}

function trackExternalLinkClick(linkType, destination) {
    trackClick('external_link_click', {
        link_type: linkType,
        destination: destination
    });
}

// Enhanced click tracking for all interactive elements
function setupEnhancedClickTracking() {
    // Track filter button clicks
    document.addEventListener('click', (e) => {
        const filterBtn = e.target.closest('.filter-btn');
        if (filterBtn && !filterBtn.classList.contains('tags-filter-btn')) {
            const filterType = filterBtn.dataset.filter;
            trackFilterClick(filterType);
        }
        
        // Track tag filter button
        if (e.target.classList.contains('tags-filter-btn')) {
            trackClick('tag_filter_open', {});
        }
        
        // Track tag selections
        if (e.target.type === 'checkbox' && e.target.closest('.tag-filter-dropdown')) {
            const tagName = e.target.id.replace('tag-', '');
            const isChecked = e.target.checked;
            trackTagFilterClick(`${tagName} (${isChecked ? 'selected' : 'deselected'})`);
        }
        
        // Track action buttons in event details
        if (e.target.classList.contains('action-btn')) {
            const buttonType = e.target.classList.contains('ticket-btn') ? 'Get Tickets' : 
                              e.target.classList.contains('website-btn') ? 'Website' : 'Other';
            const eventName = e.target.closest('.event-detail')?.querySelector('.event-detail-title')?.textContent || 'Unknown Event';
            trackActionButtonClick(buttonType, eventName);
        }
        
        // Track back button
        if (e.target.classList.contains('back-btn-sharp')) {
            trackNavigationClick('Back to Events List');
        }
        
        // Track venue links
        if (e.target.classList.contains('venue-link')) {
            const eventName = e.target.closest('.event-detail')?.querySelector('.event-detail-title')?.textContent || 'Unknown Event';
            trackExternalLinkClick('Venue Address', 'Google Maps');
        }
        
        // Track newsletter link
        if (e.target.classList.contains('newsletter-link')) {
            trackExternalLinkClick('Newsletter Signup', 'Mailchimp');
        }
        
        // Track mobile view toggle
        if (e.target.closest('.view-toggle-btn')) {
            trackNavigationClick('Mobile View Toggle');
        }
        
        // Track tag filter actions
        if (e.target.classList.contains('clear-tags-btn')) {
            trackClick('tag_filter_clear', {});
        }
        
        if (e.target.classList.contains('apply-tags-btn')) {
            trackClick('tag_filter_apply', {
                selected_tags_count: selectedTags.length
            });
        }
        
        if (e.target.classList.contains('close-tag-filter')) {
            trackClick('tag_filter_close', {});
        }
    });
    
    // Track map marker clicks (these are handled in addMarkers function)
    // Track event card clicks (these are handled in createEventCardHTML)
}