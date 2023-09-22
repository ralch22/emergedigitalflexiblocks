import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.GATSBY_WEBSITE_URL,
  consumerKey: process.env.GATSBY_CONSUMER_KEY,
  consumerSecret: process.env.GATSBY_CONSUMER_SECRET,
  version: 'wc/v3', // Adjust the API version as needed
});
// Define an async thunk for fetching orders from the API
export const fetchPaymentMethods = createAsyncThunk('payment/fetchPaymentMethods', async () => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
      try {
        const response = await WooCommerce.get(`payment_gateways`);
    
        // Assuming the API response contains an array of orders
   
        return response.data
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

// Define an async thunk for fetching orders from the API
export const fetchShipmentMethods = createAsyncThunk('shipment/fetchShipmentMethods', async () => {
  // Convert the UTF-8 string to an integer (assuming it's an integer)
    try {
      const response = await WooCommerce.get(`shipping_methods`);
  
      // Assuming the API response contains an array of orders
 
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


const methodSlice = createSlice({
  name: 'method',
  initialState: {
    payment: [],
    shipment: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payment = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchShipmentMethods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShipmentMethods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shipment = action.payload;
      })
      .addCase(fetchShipmentMethods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default methodSlice.reducer;
