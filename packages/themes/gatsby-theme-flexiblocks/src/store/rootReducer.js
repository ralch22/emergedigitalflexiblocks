import { combineReducers } from '@reduxjs/toolkit';
import ordersReducer from './ducks/orderSlice';
import productsReducer from './ducks/productSlice';
import cartReducer from './ducks/cartSlice';
import checkoutReducer from './ducks/checkoutSlice';
import subsReducer from './ducks/subsSlice';
import downloadsReducer from './ducks/downloadSlice';
import addressReducer from './ducks/addressSlice';
import userReducer from './ducks/userSlice';
import methodReducer from './ducks/methodSlice';
import caseReducer from './ducks/caseSlice';
import subscriptionReducer from './ducks/subscriptionSlice';
import contactReducer from './ducks/contactSlice';

const rootReducer = combineReducers({
  orders: ordersReducer,
  products: productsReducer,
  subs: subsReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  downloads: downloadsReducer,
  address: addressReducer,
  user: userReducer,
  method: methodReducer,
  subscription: subscriptionReducer,
  case: caseReducer,
  contact: contactReducer,
});

export default rootReducer;
