import { AsyncStorage } from 'react-native';
import * as constants from 'constants';

export default class Preference {
    static async getTourId() {
        try {
            const tourId = await AsyncStorage.getItem('tourId');
            return tourId !== null ? tourId : constants.DEFAULT_TOUR_ID;
        } catch (error) {
            return constants.DEFAULT_TOUR_ID;
        }
    }
    static async setTourId(value) {
        try {
            await AsyncStorage.setItem('tourId', value);
            return true;
        } catch (error) {
            return false;
        }
    }
}
