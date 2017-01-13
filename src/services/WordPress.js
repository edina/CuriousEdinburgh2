import * as constants from '../constants';
/* global fetch:false*/
export default class WordPress {
  static getCategories() {
    return fetch(constants.CATEGORIES, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      } })
      .then(response => response.json())
      .then(responseJson => responseJson)
      .catch((error) => {
        console.log(error);
      });
  }
  static getPostsFromCategory(value) {
    return fetch(constants.POSTS_BY_CATEGORY + value, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      } })
      .then(response => response.json())
      .then(responseJson => responseJson)
      .catch((error) => {
        console.log(error);
      });
  }
}
