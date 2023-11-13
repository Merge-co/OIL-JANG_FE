import { combineReducers } from 'redux';
import productCategoryReducer from './ProductCategoryModule';
import reportReducer from './ReportModule';

const rootReducer = combineReducers({
    productCategoryReducer, reportReducer
});
export default rootReducer;