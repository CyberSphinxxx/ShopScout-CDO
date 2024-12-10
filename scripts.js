const stores = [
    { name: 'SM City Cagayan de Oro', address: 'Masterson Avenue, Upper Carmen, Cagayan de Oro City', lat: 8.4829, lng: 124.6266 },
    { name: 'Centrio Mall', address: 'Claro M. Recto Avenue, Cagayan de Oro City', lat: 8.4820, lng: 124.6451 },
    { name: 'Gaisano City Mall', address: 'Corrales Avenue, Cagayan de Oro City', lat: 8.4825, lng: 124.6458 },
    { name: 'Limketkai Center', address: 'Limketkai Drive, Cagayan de Oro City', lat: 8.4857, lng: 124.6577 },
    { name: 'Robinsons Cagayan de Oro', address: 'Rosario Crescent, Limketkai Center, Cagayan de Oro City', lat: 8.4835, lng: 124.6568 },
];

const storesList = document.getElementById('stores');
const noResultsMessage = document.getElementById('no-results');
const map = L.map('map').setView([8.4819, 124.6459], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function displayStores(storeArray) {
    storesList.innerHTML = '';
    storeArray.forEach((store, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${store.name}</strong><br>
            ${store.address}<br>
            <button class="view-on-map" data-lat="${store.lat}" data-lng="${store.lng}">View on Map</button>
        `;
        storesList.appendChild(li);
    });
    addMapButtonListeners();

    // Show or hide "No results" message
    if (storeArray.length === 0) {
        noResultsMessage.classList.remove('hidden');
    } else {
        noResultsMessage.classList.add('hidden');
    }
}

function addMapButtonListeners() {
    const mapButtons = document.querySelectorAll('.view-on-map');
    mapButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const lat = parseFloat(e.target.getAttribute('data-lat'));
            const lng = parseFloat(e.target.getAttribute('data-lng'));
            updateMap(lat, lng);
        });
    });
}

function updateMap(lat, lng) {
    map.setView([lat, lng], 15); // Center map on the store's location
    L.marker([lat, lng]).addTo(map); // Add a marker for the store
}

function filterStores(query) {
    query = query.toLowerCase();
    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(query) || store.address.toLowerCase().includes(query)
    );
    displayStores(filteredStores);
}

// Event listener for input field to update results as you type
document.getElementById('search-input').addEventListener('input', () => {
    const query = document.getElementById('search-input').value;
    filterStores(query);
});

// Display all stores initially
displayStores(stores);
