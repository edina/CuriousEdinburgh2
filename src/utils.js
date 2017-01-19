export default class Utils {
    static getURLsFromHTMLImage(html) {
        const regex = /<img[^>]*(?:\bsrc\b\s*=)[^"]*"([^"]*)"[^>]*>/g;
        return Utils.getFirstCapturedMatchForSuccessiveMatches(regex, html);
    }
    static getURLsFromPipeString(string) {
        const regex = /(\bhttp\b[^|]*|\bhttps\b[^|]*)/g;
        return Utils.getFirstCapturedMatchForSuccessiveMatches(regex, string);
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
}
