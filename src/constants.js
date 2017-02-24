import Location from './models/Location';

/* http://v2.wp-api.org/ documentation API for WordPress */
export const URL = 'http://curiousedinburgh.org';
export const UPLOADS_URL = `${URL}/wp-content/uploads`;
export const WP_JSON = `${URL}/wp-json/wp/v2`;
export const MAX_NUM_CATEGORIES = '100';
export const MAX_NUM_POSTS = '100';
export const CATEGORIES = `${WP_JSON}/categories?per_page=${MAX_NUM_CATEGORIES}`;
export const POSTS_BY_CATEGORY = `${WP_JSON}/posts?per_page=${MAX_NUM_POSTS}&categories=`;
export const DEFAULT_TOUR_ID = '4'; // History of Science
export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoiam9sbG9wcmUiLCJhIjoiY2l6ZWE0YnVmMDA3MzMycGVkZjlkN3E3ayJ9.VZ0Ih1aDaRKlUTPBtkfPng';
export function MAPBOX_URL_DIRECTIONS(locationStart, locationEnd) {
    if (!(locationStart instanceof Location)) {
        throw new TypeError('Location object is expected for locationStart');
    } else if (!(locationEnd instanceof Location)) {
        throw new TypeError('Location object is expected for locationEnd');
    }
    const coordinates = `${locationStart.longitude},${locationStart.latitude};${locationEnd.longitude},${locationEnd.latitude}`;
    return `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}?access_token=${MAPBOX_ACCESS_TOKEN}&geometries=geojson`;
}

