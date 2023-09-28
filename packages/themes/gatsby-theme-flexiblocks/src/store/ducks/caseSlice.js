// caseStudiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  caseStudies: [],
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk to fetch case studies and images
export const fetchCaseStudies = createAsyncThunk('caseStudies/fetchCaseStudies', async () => {
  try {
    // Fetch case studies from the first URL
    const response = await fetch('https://emergedigital.ae/wp-json/wp/v2/case-studies');
    const caseStudies = await response.json();

    // Filter out the media IDs
    const mediaIds = caseStudies.map((study) => study.featured_media);

    // Fetch media for each ID and extract image URLs
    const mediaPromises = mediaIds.map(async (mediaId) => {
      const mediaResponse = await fetch(`https://emergedigital.ae/wp-json/wp/v2/media/${mediaId}`);
      const mediaData = await mediaResponse.json();
      return mediaData.guid.rendered;
    });

    const images = await Promise.all(mediaPromises);

    // Combine case studies with image URLs
    const casesWithImages = caseStudies.map((study, index) => ({
      ...study,
      imageUrl: images[index],
    }));

    return casesWithImages;
  } catch (error) {
    throw error;
  }
});

// Create the slice
const caseStudiesSlice = createSlice({
  name: 'caseStudies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStudies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.caseStudies = action.payload;
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default caseStudiesSlice.reducer;

// Export the async thunk for use in components
export { fetchCaseStudies };


