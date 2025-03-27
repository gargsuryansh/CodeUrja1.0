import React, { useState, useEffect } from 'react';
import { geoJsonToLeaflet } from '../../lib/mapUtils';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';

// Fix for Leaflet marker icons in Next.js
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

// Component to handle map view changes
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapView = ({ lands, selectedLandId, onLandSelect, editable = false }) => {
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: Center of India
  const [mapZoom, setMapZoom] = useState(5);
  
  // Find selected land and update map view if needed
  useEffect(() => {
    if (selectedLandId && lands && lands.length) {
      const selectedLand = lands.find(land => land._id === selectedLandId);
      if (selectedLand && selectedLand.geoLocation) {
        const [lng, lat] = selectedLand.geoLocation.coordinates;
        setMapCenter([lat, lng]);
        setMapZoom(15);
      }
    } else if (lands && lands.length && !selectedLandId) {
      // If no land is selected but we have lands, center the map on the first land
      const firstLand = lands[0];
      if (firstLand.geoLocation) {
        const [lng, lat] = firstLand.geoLocation.coordinates;
        setMapCenter([lat, lng]);
        setMapZoom(8);
      }
    }
  }, [selectedLandId, lands]);

  // Get color based on land type
  const getLandColor = (landType) => {
    switch (landType) {
      case 'agricultural': return '#8BC34A'; // Green
      case 'residential': return '#FF9800'; // Orange
      case 'commercial': return '#F44336'; // Red
      case 'industrial': return '#9C27B0'; // Purple
      case 'mixed': return '#2196F3'; // Blue
      default: return '#607D8B'; // Gray
    }
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-gray-300">
      {typeof window !== 'undefined' && (
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%', minHeight: '400px' }}
        >
          <ChangeView center={mapCenter} zoom={mapZoom} />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {lands && lands.map(land => {
            // Check if the land has valid boundaries
            if (!land.boundaries || !land.boundaries.coordinates || !land.boundaries.coordinates[0]) {
              return null;
            }
            
            // Convert GeoJSON coordinates to Leaflet format
            const polygonCoords = geoJsonToLeaflet(land.boundaries.coordinates[0]);
            
            // Get center point for marker (using first coordinate of geoLocation)
            const markerPosition = land.geoLocation 
              ? [land.geoLocation.coordinates[1], land.geoLocation.coordinates[0]] 
              : null;
            
            return (
              <div key={land._id}>
                {/* Land boundary polygon */}
                <Polygon
                  positions={polygonCoords}
                  pathOptions={{
                    color: getLandColor(land.landType),
                    fillOpacity: 0.5,
                    weight: land._id === selectedLandId ? 4 : 2,
                    opacity: land._id === selectedLandId ? 1 : 0.7,
                  }}
                  eventHandlers={{
                    click: () => {
                      if (onLandSelect) onLandSelect(land._id);
                    }
                  }}
                />
                
                {/* Marker at land center point */}
                {markerPosition && (
                  <Marker
                    position={markerPosition}
                    eventHandlers={{
                      click: () => {
                        if (onLandSelect) onLandSelect(land._id);
                      }
                    }}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-medium">Survey No: {land.surveyNumber}</h3>
                        <p className="text-sm">Area: {land.area} {land.areaUnit}</p>
                        <p className="text-sm">Type: {land.landType}</p>
                        <p className="text-sm">Location: {land.location.address}</p>
                        <button 
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            if (onLandSelect) onLandSelect(land._id);
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </div>
            );
          })}
          
          {/* Add drawing controls if editable */}
          {editable && (
            <div>
              {/* In a real app, you would integrate Leaflet.Draw here */}
              {/* For demo purposes, we're keeping this simple */}
            </div>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
