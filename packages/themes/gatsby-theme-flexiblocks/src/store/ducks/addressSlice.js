import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { decodeId } from '../../utils/tools';

const WooCommerce = new WooCommerceRestApi({
  url: process.env.GATSBY_WEBSITE_URL,
  consumerKey: process.env.GATSBY_CONSUMER_KEY,
  consumerSecret: process.env.GATSBY_CONSUMER_SECRET,
  version: 'wc/v3', // Adjust the API version as needed
});
// Define an async thunk for fetching orders from the API
export const fetchShipping = createAsyncThunk(
  'shipping/fetchShipping',
  async ({ id }) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
    const userId = decodeId(id);
    try {
      const response = await WooCommerce.get(`customers/${userId}`);

      // Assuming the API response contains an array of orders

      return response.data.shipping;
    } catch (error) {
      // Invalid request, for 4xx and 5xx statuses
      // console.log("Response Status:", error.response.status);
      // console.log("Response Headers:", error.response.headers);
      // console.log("Response Data:", error.response.data);
      throw error; // Re-throw the error to propagate it further if needed
    } finally {
      // Always executed.
    }
  },
);

export const updateShipping = createAsyncThunk(
  'shipping/updateShipping',
  async ({ id, data }) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
    const userId = decodeId(id);
    try {
      const response = await WooCommerce.put(`customers/${userId}`, data);

      // Assuming the API response contains an array of orders

      return response.data.shipping;
    } catch (error) {
      // Invalid request, for 4xx and 5xx statuses
      // console.log("Response Status:", error.response.status);
      // console.log("Response Headers:", error.response.headers);
      // console.log("Response Data:", error.response.data);
      throw error; // Re-throw the error to propagate it further if needed
    } finally {
      // Always executed.
    }
  },
);

// Define an async thunk for fetching orders from the API
export const fetchBilling = createAsyncThunk(
  'billing/fetchBilling',
  async ({ id }) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
    const userId = decodeId(id);
    try {
      const response = await WooCommerce.get(`customers/${userId}`);

      // Assuming the API response contains an array of orders

      return response.data.billing;
    } catch (error) {
      // Invalid request, for 4xx and 5xx statuses
      // console.log("Response Status:", error.response.status);
      // console.log("Response Headers:", error.response.headers);
      // console.log("Response Data:", error.response.data);
      throw error; // Re-throw the error to propagate it further if needed
    } finally {
      // Always executed.
    }
  },
);

export const updateBilling = createAsyncThunk(
  'billing/updateBilling',
  async ({ id, data }) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
    const userId = decodeId(id);
    try {
      const response = await WooCommerce.put(`customers/${userId}`, data);

      // Assuming the API response contains an array of orders

      return response.data.billing;
    } catch (error) {
      // Invalid request, for 4xx and 5xx statuses
      // console.log("Response Status:", error.response.status);
      // console.log("Response Headers:", error.response.headers);
      // console.log("Response Data:", error.response.data);
      throw error; // Re-throw the error to propagate it further if needed
    } finally {
      // Always executed.
    }
  },
);

const addressSlice = createSlice({
  name: 'shipping',
  initialState: {
    shipping: [],
    billing: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchShipping.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchShipping.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shipping = action.payload;
      })
      .addCase(fetchShipping.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateShipping.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateShipping.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shipping = action.payload;
      })
      .addCase(updateShipping.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBilling.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBilling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.billing = action.payload;
      })
      .addCase(fetchBilling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBilling.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateBilling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.billing = action.payload;
      })
      .addCase(updateBilling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;
