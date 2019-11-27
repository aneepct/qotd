import {
  GET_CATEGORIES,
  SELECT_CATEGORY,
  GET_CATEGORY_IMAGES,
} from '../actions/types';

const initialState = {
  categories: [],
  selectedCategory: {},
  categoryImages: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      }
    case GET_CATEGORY_IMAGES:
      return {
        ...state,
        categoryImages: action.payload,
      }
    default:
      return state;
  }
}
