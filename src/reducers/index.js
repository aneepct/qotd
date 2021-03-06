import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    category: categoryReducer,
});