import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { decodeId } from '../../utils/tools'

// Define an async thunk for fetching orders from the API
export const addCustomer = createAsyncThunk(
  'customer/addCustomer',
  async ({ id, data }, thunkAPI) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
    const userId = decodeId(id)
    try {
      console.log('request', data)
      const response = await fetch('https://api.tap.company/v2/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer sk_test_daBsQDPzn43TrCWXxFlGIq2A`
        },
        body: JSON.stringify(data)
      })

      let responseData = await response.json()
      if (response.status === 200) {
        return responseData
      } else {
        return thunkAPI.rejectWithValue(responseData)
      }
    } catch (e) {
      console.log('Error', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

const tapSlice = createSlice({
  name: 'shipping',
  initialState: {
    customer: [],
    subscription: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addCustomer.pending, state => {
        state.status = 'loading'
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.customer = action.payload
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default tapSlice.reducer
