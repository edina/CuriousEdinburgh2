import PromiseErrorHandler from '../models/PromiseErrorHandler';
/* global fetch:false*/
export default class Fetch {
    static get(URL) {
        if (typeof URL === 'string') {
            return new Promise((resolve, reject) => {
                fetch(URL, {
                    method: 'GET',
                    headers: {
                        'Accept-Charset': 'utf-8',
                        'Content-type': 'application/json',
                    },
                }).then((onFullfilled) => {
                    if (onFullfilled.ok) {
                        resolve(onFullfilled.json());
                    } else {
                        reject(new PromiseErrorHandler({ status: onFullfilled.status,
                            statusText: onFullfilled.statusText,
                            URL }));
                    }
                }, (onRejected) => {
                    reject(new PromiseErrorHandler({ status: onRejected.status,
                        statusText: onRejected.statusText,
                        URL }));
                });
            });
        }
        return Promise.reject(new PromiseErrorHandler({ statusText: 'A string is expected for URL parameter', URL }));
    }
}
