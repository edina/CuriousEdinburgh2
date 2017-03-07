import Fetch from './Fetch';
import * as constants from '../constants';
import Location from '../models/Location';
import Direction from '../models/Direction';

export default class MapBox {
    /*
      @locationStart represents a Location object
      @locationEnd represents a Location object
      returns a Promise object. A fullfilled promise contains a Direction object.
      A rejected promise returns an object (e.g { status: String, statusText: String}).
    */
    static getDirection(locationStart, locationEnd) {
        let URL = null;
        try {
            URL = constants.MAPBOX_URL_DIRECTIONS(locationStart, locationEnd);
        } catch (e) {
            return Promise.reject({ statusText: e.message });
        }
        return new Promise((resolve, reject) => {
            Fetch.get(URL).then((data) => {
                if (Array.isArray(data.routes)
                  && data.routes[0]
                  && data.routes[0].geometry
                  && Array.isArray(data.routes[0].geometry.coordinates)) {
                    const coordinates = data.routes[0].geometry.coordinates.map(value =>
                      new Location({
                          latitude: parseFloat(value[1]),
                          longitude: parseFloat(value[0]) }));
                    resolve(new Direction({ coordinates }));
                } else {
                    reject({ statusText: 'geometry coordinates is not an Array property' });
                }
            }, (onRejected) => {
                reject(onRejected);
            });
        });
    }
    /*
      This method is intended to obtain an Array of Direction objects given an Array of
      Location objects. These Direction objects are calculated by passing each position of the
      Array of Location objects with its nearest greater position to the MapBox.getDirection.
      @locations is an Array of Location objects
      returns a Promise object. A fullfilled promise contains An Array of Direction objects.
      A rejected promise returns an object (e.g { status: String, statusText: String}).
    */
    static getDirections(locations) {
        if (!Array.isArray(locations)) {
            return Promise.reject({ statusText: 'An array of locations is expected' });
        } else if (locations.length < 2) {
            return Promise.resolve([]);
        }
        return new Promise((resolve, reject) => {
            const promisesCreated = locations.length - 1;
            let completed = 0;
            const directions = [];
            const intervalID = setInterval(() => {
                if (completed === promisesCreated) {
                    clearInterval(intervalID);
                    resolve(directions);
                }
            }, 100);
            locations.forEach((currentValue, index) => {
                if (index + 1 < locations.length) {
                    MapBox.getDirection(currentValue, locations[index + 1]).then((data) => {
                        directions.push(data);
                        completed += 1;
                    }, (onRejected) => {
                        completed = locations.length - 1;
                        clearInterval(intervalID);
                        reject(onRejected);
                    });
                }
            });
        });
    }
}
