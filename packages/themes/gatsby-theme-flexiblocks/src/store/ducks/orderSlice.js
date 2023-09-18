import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { decodeId } from '../../utils/tools';

const WooCommerce = new WooCommerceRestApi({
  url: process.env.GATSBY_WEBSITE_URL,
  consumerKey: process.env.GATSBY_CONSUMER_KEY,
  consumerSecret: process.env.GATSBY_CONSUMER_SECRET,
  version: 'wc/v3', // Adjust the API version as needed
});
// Define an async thunk for fetching orders from the API
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({ id }) => {
  


// Convert the UTF-8 string to an integer (assuming it's an integer)
    const userId = decodeId(id)
      try {
        const response = await WooCommerce.get("orders", {
          customer: 7
        });
        
    
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        console.log("Response Data:", response.data);
    
        return response.data; 
      } catch (error) {
        // Invalid request, for 4xx and 5xx statuses
        // console.log("Response Status:", error.response.status);
        // console.log("Response Headers:", error.response.headers);
        // console.log("Response Data:", error.response.data);
        throw error; // Re-throw the error to propagate it further if needed
      } finally {
        // Always executed.
      }

 
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    allOrders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allOrders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
