// cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    order: {
      payment_method: "tap",
      payment_method_title: "Tap",
      set_paid: true,
      shipping: [],
      billing: [],
      line_items: [],
      shipping_lines: [],
    },
    subscription: {
      payment_method: "tap",
      payment_method_title: "Tap",
      set_paid: true,
      shipping: [],
      billing: [],
      line_items: [],
      shipping_lines: [],
    }
  },
  reducers: {
    addUserShipping: (state, action) => {
      state.order.shipping = action.payload
    },
    addUserBilling: (state, action) => {
      state.order.billing = action.payload
    },
    addLineItems: (state, action) => {
      state.order.line_items = action.payload
    },
    addLineShipping: (state, action) => {
      state.order.shipping_lines = action.payload
    }
  },
});

export const { addUserInfo, addUserShipping, addUserBilling, addLineShipping, addLineItems } = checkoutSlice.actions;

export default checkoutSlice.reducer;
