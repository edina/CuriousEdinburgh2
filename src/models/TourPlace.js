import shortid from 'shortid';
import Location from '../models/Location';

export default class TourPlace {
    constructor({ id = '0', title = '', description = '',
        images = [], location = new Location(0, 0),
        streetAddress = '', additionalLinks = [],
        stop = null, video = '', url = '' } = {}) {
        this.randomId = shortid.generate();
        this.id = id;
        this.title = title;
        this.description = description;
        this.images = images;
        this.location = location;
        this.streetAddress = streetAddress;
        this.additionalLinks = additionalLinks;
        this.stop = stop;
        this.video = video;
        this.url = url;
    }

    getShortDescription(n = 250) {
        return this.description.substr(0, n - 1) +
            (this.description.length > n ? ' ...' : '');
    }
}
