import WordPress from '../../src/services/WordPress';
import Tour from '../../src/models/Tour';
import TourPlace from '../../src/models/TourPlace';
import * as constants from '../../src/constants';

/* global describe */
/* global beforeAll */
/* global test */
/* global expect */

describe('WordPress getTours() suite', () => {
    let toursPromise;
    beforeAll(() => {
        toursPromise = WordPress.getTours();
    });
    test('Every element is a Tour object', () =>
        toursPromise.then(data =>
            data.every(e =>
                expect(e).toBeInstanceOf(Tour),
            ),
        ),
    );
    test('There are 3 tours', () =>
        toursPromise.then(data => expect(data).toHaveLength(3)),
    );
});

describe('WordPress getTourPlaces() suite', () => {
    let tourPlacesPromise;
    beforeAll(() => {
        tourPlacesPromise = WordPress.getTourPlaces(new Tour({ id: constants.DEFAULT_TOUR_ID }));
    });
    test('Every element is a TourPlace object', () =>
        tourPlacesPromise.then(data =>
            data.every(e =>
                expect(e).toBeInstanceOf(TourPlace),
            ),
        ),
    );
    test('Every TourPlace has 1 or more images', () =>
        tourPlacesPromise.then(data =>
            data.every(e =>
                expect(e.images.length).toBeGreaterThan(0),
            ),
        ),
    );
    test('Every TourPlace location is different from zero', () =>
        tourPlacesPromise.then((data) => {
            data.every(e =>
                expect(e.location.latitude !== 0).toBeTruthy(),
            );
            data.every(e =>
                expect(e.location.longitude !== 0).toBeTruthy(),
            );
        }),
    );
    test('Every tourPlace stop is not null', () =>
        tourPlacesPromise.then(data =>
            data.every(e =>
                expect(e.stop).not.toBeNull(),
            ),
        ),
    );
});

