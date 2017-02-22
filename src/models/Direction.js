import shortid from 'shortid';

export default class Direction {
    // coordinates should be an Array of Location
    constructor({ coordinates = [] } = {}) {
        this.id = shortid.generate();
        this.coordinates = coordinates; // Represents an Array of Location objects
    }
}
