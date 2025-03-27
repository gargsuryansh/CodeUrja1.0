// City data with AQI values and coordinates (approximate)
const cities = [
    { name: "Hyderabad", aqi: 106, x: 400, y: 450 },
    { name: "Aizawl", aqi: 105, x: 600, y: 350 },
    { name: "Amravati", aqi: 140, x: 350, y: 400 },
    { name: "Amritsar", aqi: 130, x: 300, y: 200 },
    { name: "Bengaluru", aqi: 109, x: 380, y: 550 },
    { name: "Chandigarh", aqi: 126, x: 320, y: 220 },
    { name: "Chennai", aqi: 115, x: 420, y: 580 },
    { name: "Delhi", aqi: 160, x: 350, y: 250 },
    { name: "Gurugram", aqi: 155, x: 340, y: 260 },
    { name: "Jaipur", aqi: 135, x: 300, y: 300 },
    { name: "Kolkata", aqi: 120, x: 520, y: 350 },
    { name: "Patna", aqi: 145, x: 450, y: 300 },
    { name: "Shillong", aqi: 95, x: 580, y: 300 },
    { name: "Talcher", aqi: 150, x: 480, y: 400 },
    { name: "Visakhapatnam", aqi: 110, x: 450, y: 480 }
];

// Function to get color based on AQI value
function getAqiColor(aqi) {
    if (aqi <= 50) return "#00e400"; // Good
    if (aqi <= 100) return "#ffff00"; // Moderate
    if (aqi <= 150) return "#ff7e00"; // Unhealthy for Sensitive Groups
    if (aqi <= 200) return "#ff0000"; // Unhealthy
    if (aqi <= 300) return "#99004c"; // Very Unhealthy
    return "#7e0023"; // Hazardous
}

// Function to get AQI category
function getAqiCategory(aqi) {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
}

// Initialize the map with city markers
function initMap() {
    const svgMap = document.getElementById('india-map');
    
    cities.forEach(city => {
        // Create group for city marker
        const cityGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        cityGroup.classList.add("city-marker");
        cityGroup.setAttribute("data-city", city.name);
        
        // Create circle for the city
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", city.x);
        circle.setAttribute("cy", city.y);
        circle.setAttribute("r", "10");
        circle.setAttribute("fill", getAqiColor(city.aqi));
        circle.setAttribute("stroke", "#333");
        circle.setAttribute("stroke-width", "1");
        
        // Create text label for the city
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", city.x);
        text.setAttribute("y", city.y + 25);
        text.textContent = city.name;
        
        // Add elements to the group
        cityGroup.appendChild(circle);
        cityGroup.appendChild(text);
        
        // Add click event
        cityGroup.addEventListener("click", () => highlightCity(city.name));
        
        // Add to the map
        svgMap.appendChild(cityGroup);
    });
}

// Populate city details
function populateCityDetails() {
    const cityList = document.getElementById('city-list');
    
    cities.forEach(city => {
        const cityItem = document.createElement('div');
        cityItem.classList.add('city-item');
        cityItem.setAttribute('data-city', city.name);
        
        cityItem.innerHTML = `
            <h4>${city.name}</h4>
            <p>AQI: <strong style="color: ${getAqiColor(city.aqi)}">${city.aqi}</strong></p>
            <p>Category: ${getAqiCategory(city.aqi)}</p>
        `;
        
        cityItem.addEventListener('click', () => highlightCity(city.name));
        
        cityList.appendChild(cityItem);
    });
}

// Highlight selected city
function highlightCity(cityName) {
    // Remove previous selection
    document.querySelectorAll('.city-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selection to current city
    const cityItem = document.querySelector(`.city-item[data-city="${cityName}"]`);
    if (cityItem) {
        cityItem.classList.add('selected');
        cityItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Highlight on map
    document.querySelectorAll('.city-marker').forEach(marker => {
        const circle = marker.querySelector('circle');
        if (marker.getAttribute('data-city') === cityName) {
            circle.setAttribute('stroke-width', '3');
            circle.setAttribute('r', '12');
        } else {
            circle.setAttribute('stroke-width', '1');
            circle.setAttribute('r', '10');
        }
    });
}

// Generate random prediction data
function generatePredictionData() {
    const dates = [];
    const aqiValues = [];
    
    // Current date
    const currentDate = new Date();
    
    // Generate data for 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() + i);
        
        // Format date as DD-MM-YYYY
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        dates.push(formattedDate);
        
        // Generate random AQI value between 90 and 160
        const aqi = Math.floor(Math.random() * 70) + 90;
        aqiValues.push(aqi);
    }
    
    return { dates, aqiValues };
}

// Create prediction chart
function createPredictionChart() {
    const { dates, aqiValues } = generatePredictionData();
    
    const ctx = document.getElementById('prediction-chart').getContext('2d');
    
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, 'rgba(255, 126, 0, 0.6)');
    gradientFill.addColorStop(1, 'rgba(255, 126, 0, 0.1)');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Predicted AQI',
                data: aqiValues,
                borderColor: '#ff7e00',
                backgroundColor: gradientFill,
                borderWidth: 3,
                pointBackgroundColor: '#ff7e00',
                pointBorderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return `AQI: ${value} (${getAqiCategory(value)})`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 200,
                    title: {
                        display: true,
                        text: 'AQI Value'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

// Update last updated time
function updateLastUpdated() {
    const now = new Date();
    const formattedTime = now.toLocaleString();
    document.getElementById('last-updated').textContent = formattedTime;
}

// Simulate real-time updates for Hyderabad AQI
function startRealTimeUpdates() {
    // Update initially
    updateLastUpdated();
    
    // Update every 30 seconds
    setInterval(() => {
        // Simulate small random changes in AQI
        const hyderabadAqi = document.getElementById('hyderabad-aqi');
        const currentAqi = parseInt(hyderabadAqi.textContent);
        const change = Math.floor(Math.random() * 5) - 2; // Random change between -2 and +2
        const newAqi = Math.max(50, Math.min(200, currentAqi + change)); // Keep between 50 and 200
        
        hyderabadAqi.textContent = newAqi;
        hyderabadAqi.style.color = getAqiColor(newAqi);
        
        // Update the category
        document.querySelector('.aqi-label').textContent = getAqiCategory(newAqi);
        
        // Update last updated time
        updateLastUpdated();
    }, 30000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    populateCityDetails();
    createPredictionChart();
    startRealTimeUpdates();
    
    // Highlight Hyderabad by default
    highlightCity('Hyderabad');
});