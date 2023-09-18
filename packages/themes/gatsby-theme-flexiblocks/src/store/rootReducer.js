import { combineReducers } from '@reduxjs/toolkit';
import ordersReducer from './ducks/orderSlice';
import productsReducer from './ducks/productSlice';
import cartReducer from './ducks/cartSlice';
import subsReducer from './ducks/subsSlice';
import downloadsReducer from './ducks/downloadSlice';
import addressReducer from './ducks/addressSlice';
import userReducer from './ducks/userSlice';

const rootReducer = combineReducers({
    orders: ordersReducer,
    products: productsReducer,
    subs: subsReducer,
    cart: cartReducer,
    downloads: downloadsReducer,
    address: addressReducer,
    user: userReducer,
});
  

export default rootReducer