import { combineReducers } from 'redux';

import reportReducer from './ReportModule';
import productCategoryReducer from './ProductCategoryModule';
import productReducer from './ProductModule';

const rootReducer = combineReducers({
    productCategoryReducer,
    productReducer,
    reportReducer
});
export default rootReducer;