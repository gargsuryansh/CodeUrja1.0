document.addEventListener("DOMContentLoaded", function() {
    // AQI Value Simulation
    const aqiStatus = document.getElementById("aqi-status");

    function updateAQI() {
        let aqi = Math.floor(Math.random() * 300); // Simulating AQI between 0-300
        
        if (aqi <= 50) {
            aqiStatus.innerHTML = `AQI: <span id="aqi-value">${aqi}</span> (Good)`;
            aqiStatus.style.color = "#2ecc71";
        } else if (aqi <= 100) {
            aqiStatus.innerHTML = `AQI: <span id="aqi-value">${aqi}</span> (Moderate)`;
            aqiStatus.style.color = "#f1c40f";
        } else if (aqi <= 200) {
            aqiStatus.innerHTML = `AQI: <span id="aqi-value">${aqi}</span> (Unhealthy)`;
            aqiStatus.style.color = "#e67e22";
        } else {
            aqiStatus.innerHTML = `AQI: <span id="aqi-value">${aqi}</span> (Hazardous)`;
            aqiStatus.style.color = "#e74c3c";
        }
    }

    document.getElementById("getStarted").addEventListener("click", updateAQI);

    // Particle.js Configuration
    particlesJS("particles-js", {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1 }
        }
    });
});
