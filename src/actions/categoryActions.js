import axios from 'axios';

import {
    GET_CATEGORIES,
    REMOVE_CATEGORY,
    GET_ERRORS,
    SELECT_CATEGORY,
    GET_CATEGORY_IMAGES,
} from "./types";

import apiUrl from '../config';

/**
 * GET Selected category
 */
export const selectedCategory = (category) => dispatch => {
  return dispatch({
    type: SELECT_CATEGORY,
    payload: category,
  })
}

/**
 * GET Categories list
 */
export const getCategories = () => dispatch => {
    return axios
      .get(`${apiUrl}/api/category/all`)
      .then(res => {
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data,
            })
      })
      .catch(err => dispatch({
          type: GET_CATEGORIES,
          payload: []
        })
      )
}

/**
 * Get category Images
 */
export const getCategoryImages = (cateId) => dispatch => {
  return axios
    .get(`${apiUrl}/api/category/get_images/${cateId}`)
    .then(res => {
      dispatch({
        type: GET_CATEGORY_IMAGES,
        payload: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: GET_CATEGORY_IMAGES,
        payload: []
      })
    })
}

/**
 * Upload category images
 */
export const saveCategoryImages = (cateId, categoryImages) => dispatch => {
  let formData = new FormData();
  categoryImages.files.forEach(function(image, i) {
    formData.append('file_' + i, image);
  });

  return axios
    .post(`${apiUrl}/api/category/upload_images/${cateId}`, formData)
    .then(res => {
      dispatch({
        type: GET_CATEGORY_IMAGES,
        payload: [],
      })
    })
    .catch(err => {
      dispatch({
        type: GET_CATEGORY_IMAGES,
        payload: []
      })
    })
}

/**
 * POST add category
 */
export const addCategory = (categoryData, history) => dispatch => {
    return axios
      .post(`${apiUrl}/api/category/add`, categoryData)
      .then(res => {
        history.push('/category');
      })
      .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
    )
}

/**
 * GET remove category
 */
export const removeCategory = (cateId) => dispatch => {
    return axios
      .get(`${apiUrl}/api/category/remove/${cateId}`)
      .then(res => {
        dispatch({
            type: REMOVE_CATEGORY,
            payload: res.data
        })
      })
      .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
    )
}