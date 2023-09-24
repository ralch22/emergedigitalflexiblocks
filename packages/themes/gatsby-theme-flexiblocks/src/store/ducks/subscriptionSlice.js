// subscriptionSlice.js

import { createSlice } from '@reduxjs/toolkit';

const loadSubscriptionFromLocalStorage = () => {
  try {
    const subscriptionData = localStorage.getItem('subscription');
    return subscriptionData ? JSON.parse(subscriptionData) : [];
  } catch (error) {
    console.error('Error loading subscription data from local storage:', error);
    return [];
  }
};

const saveSubscriptionToLocalStorage = (subscription) => {
  try {
    localStorage.setItem('subscription', JSON.stringify(subscription));
  } catch (error) {
    console.error('Error saving subscription data to local storage:', error);
  }
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: loadSubscriptionFromLocalStorage(),
  reducers: {
    addToSubscription: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveSubscriptionToLocalStorage(state);
    },
    clearSubscription: () => {
      localStorage.removeItem("subscription")
      return [];
      // saveCartToLocalStorage([]);
    },
  },
});

export const { addToSubscription, clearSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
