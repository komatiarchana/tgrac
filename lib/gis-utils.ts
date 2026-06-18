// GIS utility functions for Telangana Planning Department website

export interface Location {
  id: string;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  attributes: Record<string, any>;
  created_at: string;
  created_by: string | null;
}

export interface GISLayer {
  id: string;
  name: string;
  description: string;
  layer_type: 'vector' | 'raster' | 'geojson';
  geojson_data: any;
  visible: boolean;
  opacity: number;
  z_index: number;
  style: Record<string, any>;
  metadata: Record<string, any>;
  created_at: string;
}

export interface Viewpoint {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  zoom_level: number;
  bearing: number;
  pitch: number;
  image_url: string | null;
  panoramic_url: string | null;
  created_at: string;
}

export interface SatelliteImagery {
  id: string;
  name: string;
  description: string;
  image_url: string;
  bounds_north: number;
  bounds_south: number;
  bounds_east: number;
  bounds_west: number;
  capture_date: string | null;
  created_at: string;
}

export interface LocationQA {
  id: string;
  location_id: string;
  question: string;
  answer: string | null;
  created_by: string | null;
  created_at: string;
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Get map bounds from array of locations
export function getMapBounds(locations: Location[]) {
  if (locations.length === 0) return null;

  let minLat = locations[0].latitude;
  let maxLat = locations[0].latitude;
  let minLon = locations[0].longitude;
  let maxLon = locations[0].longitude;

  for (const loc of locations) {
    minLat = Math.min(minLat, loc.latitude);
    maxLat = Math.max(maxLat, loc.latitude);
    minLon = Math.min(minLon, loc.longitude);
    maxLon = Math.max(maxLon, loc.longitude);
  }

  return {
    north: maxLat,
    south: minLat,
    east: maxLon,
    west: minLon,
  };
}

// Convert bounds to Leaflet LatLngBounds format
export function boundsToLatLngBounds(bounds: any) {
  return [
    [bounds.south, bounds.west],
    [bounds.north, bounds.east],
  ];
}
