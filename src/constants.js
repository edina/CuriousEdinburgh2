/* http://v2.wp-api.org/ documentation API for WordPress */
export const URL = 'http://curiousedinburgh.org';
export const UPLOADS_URL = `${URL}/wp-content/uploads`;
export const WP_JSON = `${URL}/wp-json/wp/v2`;
export const CATEGORIES = `${WP_JSON}/categories?per_page=20`;
export const POSTS_BY_CATEGORY = `${WP_JSON}/posts?categories=`;
export const DEFAULT_TOUR_ID = '4'; // History of Science
