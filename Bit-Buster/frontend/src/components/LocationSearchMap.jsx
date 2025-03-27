import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaSearch } from "react-icons/fa";

// Define disaster-prone areas
const disasterData = [
  { region: "coastal", disasters: ["Cyclone", "Flood"] },
  { region: "earthquake_zone", disasters: ["Earthquake", "Landslide"] },
  { region: "desert", disasters: ["Extreme Heat", "Drought"] },
  { region: "forest", disasters: ["Forest Fire"] },
  { region: "river", disasters: ["Flood"] },
];

// Function to determine disaster possibilities based on latitude/longitude
const getDisasterPossibilities = (lat, lon) => {
  if (lat > 8 && lat < 30 && lon > 70 && lon < 90) return ["Cyclone", "Flood"]; // Coastal regions
  if (lat > 28 && lat < 37 && lon > 75 && lon < 85) return ["Earthquake", "Landslide"]; // Earthquake-prone zone
  if (lat > 20 && lat < 30 && lon > 68 && lon < 78) return ["Extreme Heat", "Drought"]; // Desert areas
  if (lat > 10 && lat < 25 && lon > 75 && lon < 88) return ["Forest Fire"]; // Forested regions
  return ["No major disaster risks detected"];
};

function LocationSearchMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [disasterPossibilities, setDisasterPossibilities] = useState([]);

  useEffect(() => {
    // Initialize the map
    mapRef.current = L.map(mapContainer.current).setView([22.7196, 75.8577], 5); // Default India view

    // Add OpenStreetMap Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Handle Location Search
  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0]; // Extract coordinates

        // Move map to location
        mapRef.current.setView([lat, lon], 12);

        // Add or Move Marker
        if (!markerRef.current) {
          markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
        } else {
          markerRef.current.setLatLng([lat, lon]);
        }

        // Show popup with location name
        markerRef.current
          .bindPopup(`<b>${display_name}</b>`)
          .openPopup();

        // Determine disaster possibilities based on location
        setDisasterPossibilities(getDisasterPossibilities(lat, lon));
      } else {
        alert("Location not found! Try again.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-lg font-semibold mb-3 text-cyan-400 text-center">
        Live Location Search & Disaster Risk Assessment
      </h2>

      {/* Search Bar */}
      <div className="relative w-80 mb-4">
        <input
          type="text"
          placeholder="Search for a location..."
          className="border rounded-md px-3 py-2 w-full text-lg text-black focus:outline-none focus:ring focus:border-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-4 text-gray-600 hover:text-gray-800"
        >
          <FaSearch />
        </button>
      </div>

      {/* Map Display */}
      <div className="relative w-full h-[500px] bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div ref={mapContainer} className="h-full w-full" />
      </div>

      {/* Disaster Risk Display */}
      <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow-md w-80">
        <h3 className="text-lg font-semibold">Disaster Possibilities</h3>
        <ul className="list-disc list-inside mt-2">
          {disasterPossibilities.map((disaster, index) => (
            <li key={index} className="text-red-400">{disaster}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LocationSearchMap;
