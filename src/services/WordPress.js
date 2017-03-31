import Fetch from './Fetch';
import Tour from '../models/Tour';
import TourPlace from '../models/TourPlace';
import Location from '../models/Location';
import * as constants from '../constants';
import Utils from '../utils';
import PromiseErrorHandler from '../models/PromiseErrorHandler';

const Entities = require('html-entities').XmlEntities;
/* global fetch:false*/
export default class WordPress {
    static getTours() {
        return new Promise((resolve, reject) => {
            Fetch.get(constants.CATEGORIES).then((data) => {
                if (Array.isArray(data)) {
                    const dataFiltered = data.filter(value => value.description === 'true');
                    const tours = dataFiltered.map(value =>
                        new Tour({ id: value.id ? value.id.toString() : '',
                            name: value.name,
                            description: value.description,
                            slug: value.slug }));
                    resolve(tours);
                } else {
                    reject(new PromiseErrorHandler({ statusText: 'An array is expected for the data retrieved',
                        URL: constants.CATEGORIES }));
                }
                resolve(data);
            }, (onRejected) => {
                reject(onRejected);
            });
        });
    }
    static getTourPlaces(tour) {
        // TODO: Validate tour is instanceof Tour
        return new Promise((resolve, reject) => {
            Fetch.get(constants.POSTS_BY_CATEGORY + tour.id).then((data) => {
                if (Array.isArray(data)) {
                    const entities = new Entities();
                    const tourPlaces = data.map((value) => {
                        const customFields = value.custom_fields;
                        if (customFields) {
                            let tourStop = null;
                            try {
                                tourStop = Utils.getTourStopFromSlug(
                                    tour.slug, customFields.tour_stops);
                            } catch (e) { console.log(e); }
                            return new TourPlace({
                                id: value.id ? value.id.toString() : '',
                                title: customFields.OSM_Marker_01_Name,
                                description: entities.decode(customFields.main_text),
                                // TODO Check value returned from html-entities third party library
                                images: Utils.getURLsFromHTMLImage(value.content.rendered),
                                location: new Location({
                                    latitude: Utils.toFloat(customFields.latitude),
                                    longitude: Utils.toFloat(customFields.longitude) }),
                                streetAddress: customFields.street_address,
                                additionalLinks:
                                    Utils.getURLsFromPipeString(customFields.additional_links),
                                stop: tourStop,
                                video: Utils.getEmbeddedYTURL(customFields.video_link),
                            });
                        }
                        return new TourPlace({
                            id: value.id ? value.id.toString() : '',
                            images: Utils.getURLsFromHTMLImage(value.content.rendered) });
                    });
                    tourPlaces.sort((a, b) => a.stop - b.stop); // TODO check sorting places
                    // when stop are not string (e.g null if regex failed)
                    resolve(tourPlaces);
                } else {
                    reject(new PromiseErrorHandler({ statusText: 'An array is expected for the data retrieved', URL: constants.POSTS_BY_CATEGORY + tour.id }));
                }
            }, (onRejected) => {
                reject(onRejected);
            });
        });
    }
}
