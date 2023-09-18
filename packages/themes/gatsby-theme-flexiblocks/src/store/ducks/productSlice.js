// productsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Configure the WooCommerce API instance
const WooCommerce = new WooCommerceRestApi({
    url: 'https://emergedigital.ae/',
    consumerKey: "ck_df4765e80f8d16e1567094ebae468b6e817acb5f",
    consumerSecret: "cs_fff806cc2fe197879ba20245ffc7e8d630219766",
    version: 'wc/v3', // Adjust the API version as needed
  });

// Define an async thunk for fetching products from the API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ token }, thunkAPI) => {
    
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    
      try {
        const response = await WooCommerce.get("products", {
          per_page: 36, // 20 products per page
        });
        
        // Successful request
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

export const filterProductsByCategory = (categoryId) => ({
  type: 'products/filterByCategory',
  payload: categoryId,
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    filteredProducts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    filterByCategory: (state, action) => {
      const categoryId = action.payload;
      state.filteredProducts = state.allProducts.filter((product) => {
        const firstCategory = product.categories[0]; // Assuming the first category is the one you want
        return firstCategory.id === categoryId;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { filterByCategory } = productSlice.actions;
export default productSlice.reducer;
