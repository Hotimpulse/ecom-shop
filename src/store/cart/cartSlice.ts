import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICartsData, IUserCarts } from "@src/interfaces/IUserCarts";

const initialState: IUserCarts = {
  carts: {
    carts: [],
    total: 0,
    skip: 0,
    limit: 0,
  },
  status: "loading", // 'loading', 'error', 'ready'
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCarts",
  async (userid: number) => {
    const response = await fetch(`https://dummyjson.com/carts/user/${userid}`);

    if (!response.ok) throw new Error("Failed to fetch carts!");

    const data: ICartsData = await response.json();
    return data;
  }
);

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.status = "ready";
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default cartsSlice.reducer;
