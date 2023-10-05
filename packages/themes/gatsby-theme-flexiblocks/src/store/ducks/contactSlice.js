import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const portalId = process.env.GATSBY_HUBSPOT_PORTALID;
const formGuid = process.env.GATSBY_HUBSPOT_CONTACTFORMID;
const formGuid2 = process.env.GATSBY_HUBSPOT_NEWSLETTERFORMID; // example form GUID (not real)

export const submitNews = createAsyncThunk(
  'news/fetchNews',
  async ({ data }) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)

    const apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const requestBody = {
      portalId,
      formGuid2,
      fields: [
        {
          name: 'email',
          value: data.email,
        },
      ],
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
);

export const submitContact = createAsyncThunk(
  'contact/fetchContact',
  async ({ data }) => {
    // Convert the UTF-8 string to an integer (assuming it's an integer)
    const apiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const requestBody = {
      portalId,
      formGuid,
      fields: [
        {
          name: 'email',
          value: data.email,
        },
        {
          name: 'firstName',
          value: data.firstName,
        },
        {
          name: 'lastName',
          value: data.lastName,
        },
        {
          name: 'message',
          value: data.message,
        },
      ],
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
);

// Define an async thunk for fetching orders from the API

const contactSlice = createSlice({
  name: 'shipping',
  initialState: {
    news: [],
    contact: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contact = action.payload;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(submitNews.pending, state => {
        state.status = 'loading';
      })
      .addCase(submitNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(submitNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
