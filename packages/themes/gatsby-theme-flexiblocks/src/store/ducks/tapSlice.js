import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decodeId } from '../../utils/tools';

// Define an async thunk for fetching orders from the API
export const addCustomer = createAsyncThunk(
  'customer/addCustomer',
  async ({ id, data }, thunkAPI) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
    const userId = decodeId(id);
    try {
      const j = JSON.stringify(data);
      console.log('request', j);
      const response = await fetch('https://api.tap.company/v2/customers', {
        method: 'POST',
        headers: {
          Authorization: `Bearer sk_test_daBsQDPzn43TrCWXxFlGIq2A`,
          'Content-Type': 'application/json',
          Accept: '/',
        },
        referrerPolicy: 'no-referrer',
        body: j,
      });

      let responseData = await response.json();
      return responseData;
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const tapSlice = createSlice({
  name: 'shipping',
  initialState: {
    customer: [],
    subscription: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addCustomer.pending, state => {
        state.status = 'loading';
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customer = action.payload;
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tapSlice.reducer;
