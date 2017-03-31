export default class PromiseErrorHandler {
    constructor({ status = 0, statusText = 'unknown', URL = null } = {}) {
        this.status = status;
        this.statusText = statusText;
        this.URL = URL;
    }
    toString() {
        return `{ status: ${this.status}, statusText: ${this.statusText} }`;
    }
}
