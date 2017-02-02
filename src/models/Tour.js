export default class Tour {
    constructor({ id = '', name = '', description = '', slug = '', tourPlaces = [] } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.slug = slug;
        this.tourPlaces = tourPlaces;
    }
}
