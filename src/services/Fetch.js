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
                        reject({ status: onFullfilled.status,
                            statusText: onFullfilled.statusText });
                    }
                }, (onRejected) => {
                    reject({ statusText: onRejected.statusText });
                });
            });
        }
        return Promise.reject({ statusText: 'A string is expected for URL parameter' });
    }
}
