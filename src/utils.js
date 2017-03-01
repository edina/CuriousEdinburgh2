import { Platform } from 'react-native';

export default class Utils {
    static getURLsFromHTMLImage(html) {
        const regex = /<img[^>]*(?:\bsrc\b\s*=)[^"]*"([^"]*)"[^>]*>/g;
        return Utils.getFirstCapturedMatchForSuccessiveMatches(regex, html);
    }
    static getURLsFromPipeString(string) {
        const regex = /(\bhttp\b[^|]*|\bhttps\b[^|]*)/g;
        return Utils.getFirstCapturedMatchForSuccessiveMatches(regex, string);
    }
    /*
        @param tourSlug represents the category slug (e.g. history_of_science) to match
        @param tourStop represents the custom field containing all the tour stops
            for a post (e.g. history_of_science:19|history_of_physics:1)
        @return the stop number for a given category slug or null if does not match
    */
    static getTourStopFromSlug(tourSlug, tourStop) {
        const regex = new RegExp(`${tourSlug}:(\\d+)`, 'g');
        const result = regex.exec(tourStop);
        return result !== null ? result[1] : null;
    }
    static getFirstCapturedMatchForSuccessiveMatches(regex, string) {
        // Types validation for parameter is recommended
        let matches = null;
        const result = [];
        while ((matches = regex.exec(string)) !== null) { // eslint-disable-line no-cond-assign
            result.push(matches[1]);
        }
        return result;
    }
    static isIos() {
        return Platform.OS === 'ios';
    }
    static isAndroid() {
        return Platform.OS === 'android';
    }
}
