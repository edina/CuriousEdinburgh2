import Location from '../models/Location';
import PromiseErrorHandler from '../models/PromiseErrorHandler';
/* global navigator:false */
export default class Geolocation {
    constructor() {
        this.id = null;
    }
    watchPosition() {
        if (this.id === null) {
            return new Promise((resolve, reject) => {
                this.id = navigator.geolocation.watchPosition(
                    (position) => {
                        if (position &&
                            position.coords &&
                            position.coords.latitude &&
                            position.coords.longitude) {
                            resolve(new Location(
                                { latitude: position.coords.latitude,
                                    longitude: position.coords.longitude }));
                        }
                        reject(new PromiseErrorHandler({ statusText: 'position.coords is undefined' }));
                    },
                    (error) => {
                        reject(new PromiseErrorHandler({ statusText: error.message }));
                    }, // ReadMore about PositionOptions at https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                );
            });
        }
        return Promise.reject(new PromiseErrorHandler({ statusText: 'watchPosition has been already registered. Call clearWatch to unregister first' }));
    }
    clearWatch() {
        if (this.id !== null) {
            navigator.geolocation.clearWatch(this.id);
            this.id = null;
        }
    }
    static getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (position &&
                        position.coords &&
                        position.coords.latitude &&
                        position.coords.longitude) {
                        resolve(new Location(
                            { latitude: position.coords.latitude,
                                longitude: position.coords.longitude }));
                    }
                    reject(new PromiseErrorHandler({ statusText: 'position.coords is undefined' }));
                },
                (error) => {
                    reject(new PromiseErrorHandler({ statusText: error.message }));
                }, // ReadMore about PositionOptions at https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        });
    }
}
