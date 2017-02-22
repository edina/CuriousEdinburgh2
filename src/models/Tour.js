export default class Tour {
    constructor({ id = '', name = '', description = '', slug = '', tourPlaces = [], directions = [] } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.slug = slug;
        this.tourPlaces = tourPlaces;
        this.directions = directions; // Represents an Array of Direction objects
    }
}
