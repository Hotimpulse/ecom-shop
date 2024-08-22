import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICartsData, IUserCarts } from "@src/interfaces/IUserCarts";
import getAuthToken from "@src/util/getAuthToken";

const initialState: IUserCarts = {
  carts: {
    carts: [],
    total: 0,
    skip: 0,
    limit: 0,
  },
  status: "", // 'loading', 'error', 'ready'
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCarts",
  async (userid: number) => {
    const token = getAuthToken();

    const response = await fetch(`https://dummyjson.com/carts/user/${userid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch carts!");

    const data: ICartsData = await response.json();
    return data;
  }
);

// export const updateCart = createAsyncThunk(
//   "cart/updateCart",
//   // async (payload: )
// )

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
