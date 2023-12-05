import { combineReducers } from 'redux';

import reportReducer from './ReportModule';
import productCategoryReducer from './ProductCategoryModule';
import productListReducer from './ProductListModule';
import pagingReducer from './PagingModule';
import mergeReducer from './MergeModule';
import productReducer from './ProductModule';
import messageReducer from './MessageModule';
import wishListReducer from './WishListModule';
import userReducer from './UserModule';
import processReducer from './ProcessModule';
import myCalendarReducer from './MyCalendarModule';
import inquiryReducer from './InquiryModule';
import inquiryCategoryReducer from './InquiryCategoryModule';
import sanctionsReducer from './SanctionsModule';

const rootReducer = combineReducers({
    productCategoryReducer,
    productListReducer,
    reportReducer,
    pagingReducer,
    mergeReducer,
    productReducer,
    messageReducer,
    wishListReducer,
    userReducer,
    processReducer,
    myCalendarReducer,
    inquiryReducer,
    inquiryCategoryReducer,
    sanctionsReducer
});
export default rootReducer;