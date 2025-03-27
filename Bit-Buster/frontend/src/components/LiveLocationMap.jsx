import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function LiveLocationMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Initialize the map
    mapRef.current = L.map(mapContainer.current).setView([22.7196, 75.8577], 10);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Get live location updates
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          if (!markerRef.current) {
            // Create a marker for the first time
            markerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
          } else {
            // Move the marker
            markerRef.current.setLatLng([latitude, longitude]);
          }

          // Center map on user location
          mapRef.current.setView([latitude, longitude], 12);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-lg font-semibold mb-3 text-cyan-400 text-center">Live Location Tracking</h2>
      
      <div className="relative w-full h-[500px] bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div ref={mapContainer} className="h-full w-full" />
      </div>

      {userLocation ? (
        <p className="mt-4 text-green-400">
          📍 Current Location: {userLocation.lat.toFixed(5)}, {userLocation.lng.toFixed(5)}
        </p>
      ) : (
        <p className="mt-4 text-red-400">Waiting for location...</p>
      )}
    </div>
  );
}

export default LiveLocationMap;
