/* http://v2.wp-api.org/ documentation API for WordPress */
export const URL = 'http://curiousedinburgh.org';
export const UPLOADS_URL = `${URL}/wp-content/uploads`;
export const WP_JSON = `${URL}/wp-json/wp/v2`;
export const MAX_NUM_CATEGORIES = '100';
export const MAX_NUM_POSTS = '100';
export const CATEGORIES = `${WP_JSON}/categories?per_page=${MAX_NUM_CATEGORIES}`;
export const POSTS_BY_CATEGORY = `${WP_JSON}/posts?per_page=${MAX_NUM_POSTS}&categories=`;
export const DEFAULT_TOUR_ID = '4'; // History of Science
