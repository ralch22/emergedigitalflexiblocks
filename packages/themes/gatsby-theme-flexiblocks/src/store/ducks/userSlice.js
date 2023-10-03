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
export const fetchUser = createAsyncThunk('user/fetchUser', async ({ id }) => {
  // Convert the UTF-8 string to an integer (assuming it's an integer)
  const userId = decodeId(id);
  try {
    const response = await WooCommerce.get(`customers/${userId}`);

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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
    const userId = decodeId(id);
    try {
      const response = await WooCommerce.put(`customers/${userId}`, data);

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

const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
