import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    // Load single seller (e.g., logged-in seller)
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })

    // Admin: Get all sellers
    .addCase("getAllSellersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase("getAllSellersFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
