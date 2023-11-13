import { combineReducers } from 'redux';
import productCategoryReducer from './ProductCategoryModule';

const rootReducer = combineReducers({
    productCategoryReducer
});

export default rootReducer;