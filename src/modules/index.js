import { combineReducers } from 'redux';

import reportReducer from './ReportModule';
import productCategoryReducer from './ProductCategoryModule';
import productListReducer from './ProductListModule';
import pagingReducer from './PagingModule';
import mergeReducer from './MergeModule';
import productReducer from './ProductModule';

const rootReducer = combineReducers({
    productCategoryReducer,
    productListReducer,
    reportReducer,
    pagingReducer,
    mergeReducer,
    productReducer
});
export default rootReducer;