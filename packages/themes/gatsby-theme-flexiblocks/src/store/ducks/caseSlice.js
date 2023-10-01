// caseStudiesSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Define the initial state
// Define the asynchronous thunk to fetch case studies and images

export const fetchCaseStudies = createAsyncThunk(
  'caseStudies/fetchCaseStudies',
  async () => {
    try {
      // Fetch case studies from the first URL
      const response = await fetch(
        'https://emergedigital.ae/wp-json/wp/v2/case-studies'
      )
      const caseStudies = await response.json()

      // Filter out the media IDs
      const mediaIds = caseStudies.map(study => study.featured_media)

      // Create an array to store image URLs
      const images = []

      // Fetch media for each ID and extract image URLs, handling 401 errors gracefully
      for (const mediaId of mediaIds) {
        try {
          const mediaResponse = await fetch(
            `https://emergedigital.ae/wp-json/wp/v2/media/${mediaId}`
          )
          if (mediaResponse.status === 200) {
            const mediaData = await mediaResponse.json()
            images.push(mediaData.guid.rendered)
          } else {
            // Handle unauthorized or other error responses here if needed
            images.push(null) // Push null to indicate an error for this image
          }
        } catch (error) {
          console.error('Error fetching media:', error)
          // Handle any other errors that occur during media fetching
          images.push(null) // Push null to indicate an error for this image
        }
      }

      // Combine case studies with image URLs, replacing missing images with a placeholder
      const casesWithImages = caseStudies.map((study, index) => ({
        ...study,
        imageUrl: images[index] || 'https://picsum.photos/400/300' // Replace with a placeholder URL
      }))

      return casesWithImages
    } catch (error) {
      throw error
    }
  }
)

// Create the slice
const caseStudiesSlice = createSlice({
  name: 'caseStudies',
  initialState: {
    caseStudies: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCaseStudies.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.caseStudies = action.payload
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default caseStudiesSlice.reducer
