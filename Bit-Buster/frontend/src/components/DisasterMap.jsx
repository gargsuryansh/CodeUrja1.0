import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbarforhome from './Navbarforhome';

function DisasterMap() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [layers, setLayers] = useState([
    { id: 'forestFire', name: 'Forest Fire', icon: '🔥', visible: true, location: [34.0522, -118.2437] }, // Los Angeles
    { id: 'earthquake', name: 'Earthquake', icon: '🌐', visible: true, location: [37.7749, -122.4194] }, // San Francisco
    { id: 'flood', name: 'Flood', icon: '🌊', visible: true, location: [27.1751, 78.0421] }, // Agra
    { id: 'cyclone', name: 'Cyclone', icon: '🌪️', visible: true, location: [15.3173, 75.7139] }, // Karnataka
    { id: 'temperature', name: 'Temperature', icon: '🌡️', visible: true, location: [40.7128, -74.006] }, // New York
  ]);

  useEffect(() => {
    const newMap = L.map(mapContainer.current).setView([22.7196, 75.8577], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(newMap);

    setMap(newMap);
    return () => newMap.remove();
  }, []);

  const handleLayerToggle = (layerId) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  // Function to navigate to a specific disaster location
  const goToLocation = (location) => {
    if (map) {
      map.setView(location, 8); // Zoom level 8
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-3 text-cyan-400 text-center">Disaster Monitoring Map</h2>

      {/* Full-width Map */}
      <div className="relative w-full h-[500px] bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div ref={mapContainer} className="h-full w-full" />
      </div>

      {/* Layer Toggle Controls (Centered) */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
        {layers.map((layer) => (
          <div key={layer.id} className="flex flex-col items-center space-y-1">
            <button
              onClick={() => handleLayerToggle(layer.id)}
              className={`flex items-center px-3 py-1 rounded-md border text-white ${
                layer.visible ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400'
              }`}
            >
              <span className="mr-2">{layer.icon}</span> {layer.name}
              <button
              onClick={() => goToLocation(layer.location)}
              className="text-sm px-1 text-white "
            >
              Go To --
            </button>
            </button>
            
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default DisasterMap;
