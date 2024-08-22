import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@src/interfaces/IProducts";

const initialState: IProduct = {
  id: 0,
  title: "",
  price: 0,
  discountPercentage: 0,
  thumbnail: "",
  description: "",
  category: "",
  rating: 0,
  stock: 0,
  tags: [""],
  status: "",
};

export const fetchProductInfo = createAsyncThunk(
  "products/fetchProductInfo",
  async (id: number) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) throw new Error("Error getting item data!");

    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductInfo.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          return {
            ...state,
            ...action.payload,
            status: "ready",
          };
        }
      )
      .addCase(fetchProductInfo.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default productSlice.reducer;
