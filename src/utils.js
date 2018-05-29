import { Platform } from 'react-native';

/* eslint-disable no-cond-assign */

export default class Utils {
    /**
     * Gets a list of Objects (e.g. url and text) from any image HTML rendered content
     * @param {string} html - the html content to look for img tags
     * @return Array of objects containing url and text
     */
    static getSrcAndAltFromHTMLImage(html) {
        const regex = /<img(?:(?:[^>]*(?:\bsrc\b\s*=)[^"]*"([^"]*)"[^>]*(?:\balt\b\s*=)[^"]*"([^"]*)")|(?:[^>]*(?:\balt\b\s*=)[^"]*"([^"]*)"[^>]*(?:\bsrc\b\s*=)[^"]*"([^"]*)"))[^>]*/g;
        if (typeof html === 'string') {
            let matches = null;
            const r = [];
            while ((matches = regex.exec(html)) !== null) {
                r.push({
                    url: matches[1] ? matches[1] : matches[4],
                    text: matches[2] ? matches[2] : matches[3],
                });
            }
            return r;
        }
        return [];
    }
    /**
     * Get list of anchors from HTML rendered content
     * @param html HTML text
     * @return Array of objects containing URL and text
     */
    static getListOfAnchorsFromHTML(html) {
        const links = [];
        let matches = null;
        const regex = /<li><a.*href="(.+?)".*>(.+)<\/a><\/li>/g;
        while ((matches = regex.exec(html)) !== null) {
            links.push({
                url: matches[1],
                text: matches[2],
            });
        }
        return links;
    }

    /**
     * @param tourSlug represents the category slug (e.g. history_of_science) to match
     * @param tourStops represent the custom field containing all the tour stops
     * for a post (e.g. history_of_science:19|history_of_physics:1)
     * @return the stop number for a given category slug or null if does not match
    */
    static getTourStopFromSlug(tourSlug, tourStops) {
        if (!(typeof tourStops === 'string')) {
            throw new TypeError('String parameter is expected for tourStops');
        }
        const regex = new RegExp(`${tourSlug}:(\\d+)`, 'g');
        const result = regex.exec(tourStops);
        return result !== null ? result[1] : null;
    }
    static isIos() {
        return Platform.OS === 'ios';
    }
    static isAndroid() {
        return Platform.OS === 'android';
    }
    /**
     * Convert youtube page URL to a playable embedded URL.
     * @param url Youtube page URL.
     * @return Converted youtube embedded URL.
     */
    static getEmbeddedYTURL(url) {
        return url.replace('watch?v=', 'embed/');
    }
    static toFloat(value) {
        const r = parseFloat(value);
        if (!isFinite(r)) {
            return 0.0;
        }
        return r;
    }
}
