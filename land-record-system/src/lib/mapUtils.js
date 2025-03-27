/**
 * Convert GeoJSON coordinates to Leaflet-compatible format
 * @param {Array} coordinates - GeoJSON coordinates array
 * @returns {Array} - Array of [lat, lng] pairs for Leaflet
 */
export function geoJsonToLeaflet(coordinates) {
  // GeoJSON format is [longitude, latitude]
  // Leaflet format is [latitude, longitude]
  if (!coordinates || !Array.isArray(coordinates)) return [];
  
  // Handle Point geometry
  if (!Array.isArray(coordinates[0])) {
    return [coordinates[1], coordinates[0]];
  }
  
  // Handle LineString or Polygon boundary
  return coordinates.map(coord => {
    if (Array.isArray(coord[0])) {
      // Handle MultiPolygon or nested structures
      return coord.map(c => [c[1], c[0]]);
    }
    return [coord[1], coord[0]];
  });
}

/**
 * Convert Leaflet coordinates to GeoJSON format
 * @param {Array} leafletCoords - Array of Leaflet coordinates
 * @returns {Array} - GeoJSON formatted coordinates
 */
export function leafletToGeoJson(leafletCoords) {
  if (!leafletCoords || !Array.isArray(leafletCoords)) return [];
  
  // Handle Point geometry
  if (!Array.isArray(leafletCoords[0])) {
    return [leafletCoords[1], leafletCoords[0]];
  }
  
  // Handle LineString or Polygon boundary
  return leafletCoords.map(coord => {
    if (Array.isArray(coord[0])) {
      // Handle MultiPolygon or nested structures
      return coord.map(c => [c[1], c[0]]);
    }
    return [coord[1], coord[0]];
  });
}

/**
 * Calculate the center point of a polygon
 * @param {Array} polygonCoords - Array of polygon coordinates
 * @returns {Array} - [latitude, longitude] of the center point
 */
export function calculatePolygonCenter(polygonCoords) {
  if (!polygonCoords || !Array.isArray(polygonCoords) || polygonCoords.length === 0) {
    return [0, 0];
  }
  // Handle different levels of nesting in coordinates
  let coordinates = polygonCoords;
  if (Array.isArray(polygonCoords[0]) && Array.isArray(polygonCoords[0][0])) {
    // This is likely a GeoJSON Polygon with outer ring
    coordinates = polygonCoords[0];
  }
  
  // Calculate the centroid
  let latSum = 0;
  let lngSum = 0;
  let count = 0;
  
  coordinates.forEach(coord => {
    if (Array.isArray(coord) && coord.length >= 2) {
      // GeoJSON format [lng, lat]
      if (coordinates === polygonCoords) {
        latSum += coord[1];
        lngSum += coord[0];
      } 
      // Leaflet format [lat, lng]
      else {
        latSum += coord[0];
        lngSum += coord[1];
      }
      count++;
    }
  });
  
  if (count === 0) return [0, 0];
  
  return [latSum / count, lngSum / count];
}

/**
 * Calculate the area of a polygon in square meters
 * @param {Array} polygonCoords - GeoJSON polygon coordinates
 * @returns {number} - Area in square meters
 */
export function calculatePolygonArea(polygonCoords) {
  if (!polygonCoords || !Array.isArray(polygonCoords) || polygonCoords.length === 0) {
    return 0;
  }
  
  // Implementation of the Shoelace formula (Gauss's area formula)
  let coordinates = polygonCoords;
  if (Array.isArray(polygonCoords[0]) && Array.isArray(polygonCoords[0][0])) {
    // This is likely a GeoJSON Polygon with outer ring
    coordinates = polygonCoords[0];
  }
  
  // Convert coordinates to cartesian approximation
  // This is a simplification and works for small areas
  const EARTH_RADIUS = 6371000; // Earth radius in meters
  const TO_RAD = Math.PI / 180;
  
  let area = 0;
  let prev = coordinates[coordinates.length - 1];
  
  for (let i = 0; i < coordinates.length; i++) {
    const current = coordinates[i];
    // Get x,y approximation
    const x1 = prev[0] * TO_RAD * EARTH_RADIUS * Math.cos(prev[1] * TO_RAD);
    const y1 = prev[1] * TO_RAD * EARTH_RADIUS;
    const x2 = current[0] * TO_RAD * EARTH_RADIUS * Math.cos(current[1] * TO_RAD);
    const y2 = current[1] * TO_RAD * EARTH_RADIUS;
    
    // Add to area using cross product
    area += x1 * y2 - x2 * y1;
    
    prev = current;
  }
  
  // Take absolute value and divide by 2
  return Math.abs(area) / 2;
}
/**
 * Check if a point is inside a polygon
 * @param {Array} point - [latitude, longitude] of the point
 * @param {Array} polygon - Array of polygon coordinates
 * @returns {boolean} - True if point is inside polygon
 */
export function isPointInPolygon(point, polygon) {
  if (!point || !polygon || !Array.isArray(polygon) || polygon.length === 0) {
    return false;
  }
  
  // Ray casting algorithm
  let coordinates = polygon;
  if (Array.isArray(polygon[0]) && Array.isArray(polygon[0][0])) {
    // This is likely a GeoJSON Polygon with outer ring
    coordinates = polygon[0];
  }
  
  const x = point[1]; // longitude
  const y = point[0]; // latitude
  
  let inside = false;
  for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
    const xi = coordinates[i][0];
    const yi = coordinates[i][1];
    const xj = coordinates[j][0];
    const yj = coordinates[j][1];
    
    const intersect = ((yi > y) !== (yj > y)) && 
                      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  
  return inside;
}