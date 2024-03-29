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
export const fetchSubs = createAsyncThunk('subs/fetchSubs', async ({ id }) => {
  // Convert the UTF-8 string to an integer (assuming it's an integer)
  const userId = decodeId(id);
  try {
    const response = await WooCommerce.get('subscriptions', {
      customer: userId,
    });

    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);

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

export const createSub = createAsyncThunk(
  'sub/createSub',
  async ({ data, id }) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
    const userId = decodeId(id);
    try {
      console.log('subss', data);
      const response = await WooCommerce.post(`subscriptions`, {
        customer_id: userId,
        status: 'active',
        billing_period: 'year',
        billing_interval: 1,
        payment_method: 'tap',
        billing: data.billing,
        shipping: data.shipping,
        line_items: data.line_items,
      });

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
  },
);

const subsSlice = createSlice({
  name: 'subs',
  initialState: {
    allSubs: [],
    subResponse: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSubs.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSubs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allSubs = action.payload;
      })
      .addCase(fetchSubs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSub.pending, state => {
        state.status = 'loading';
      })
      .addCase(createSub.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subResponse = action.payload;
      })
      .addCase(createSub.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default subsSlice.reducer;
