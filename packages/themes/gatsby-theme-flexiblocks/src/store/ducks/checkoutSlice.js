// cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    payment_method: "tap",
    payment_method_title: "Tap",
    set_paid: true,
    shipping: [],
    billing: [],
    line_items: [],
    shipping_lines: [],
  },
  reducers: {
    addUserShipping: (state, action) => {
      state.shipping = action.payload
    },
    addUserBilling: (state, action) => {
      state.billing = action.payload
    },
    addLineItems: (state, action) => {
      state.line_items = action.payload
    },
    addLineShipping: (state, action) => {
      state.shipping_lines = action.payload
    }
  },
});

export const { addUserInfo, addUserShipping, addUserBilling, addLineShipping, addLineItems } = checkoutSlice.actions;

export default checkoutSlice.reducer;
