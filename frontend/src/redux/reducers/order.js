import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  adminOrderLoading: false,
  orders: [],
  adminOrders: [],
  error: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    // Get all orders of user
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all orders of shop
    .addCase("getAllOrdersShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersShopSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all orders for admin
    .addCase("adminAllOrdersRequest", (state) => {
      state.adminOrderLoading = true;
    })
    .addCase("adminAllOrdersSuccess", (state, action) => {
      state.adminOrderLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase("adminAllOrdersFailed", (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })

    // Clear error
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
