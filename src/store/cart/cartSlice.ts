import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICartItem, ICartsData, IUserCarts } from "@src/interfaces/IUserCarts";
import getAuthToken from "@src/util/getAuthToken";
import { WritableDraft } from "immer";

const initialState: IUserCarts = {
  carts: {
    carts: [
      {
        id: 0,
        products: [],
        total: 0,
        discountedTotal: 0,
        userId: 0,
        totalProducts: 0,
        totalQuantity: 0,
      },
    ],
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

    const response = await fetch(
      `https://dummyjson.com/auth/carts/user/${userid}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch carts!");

    const data: ICartsData = await response.json();
    return data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (updatedCart: {
    cartId: number;
    products: { id: number; quantity: number }[];
  }) => {
    const token = getAuthToken();

    const response = await fetch(
      `'https://dummyjson.com/auth/carts/${updatedCart.cartId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merge: false,
          products: updatedCart.products,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to update the cart!");

    const data = await response.json();
    return data;
  }
);

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      if (state.carts.carts.length > 0) {
        state.carts.carts[0].products.push(action.payload);
        refreshCartState(state);
      }
    },
    deleteItem(state, action) {
      // payload = productId
      if (state.carts.carts.length > 0) {
        state.carts.carts[0].products = state.carts.carts[0].products.filter(
          (item) => item.id !== action.payload
        );
        refreshCartState(state);
      }
    },
    increaseQuantity(state, action) {
      if (state.carts.carts.length > 0) {
        const item = state.carts.carts[0].products.find(
          (item: ICartItem) => item.id === action.payload
        );
        if (item) {
          item.quantity += 1;
          item.total = item.quantity * item.price;
          item.discountedTotal =
            item.total - (item.total * item.discountPercentage) / 100;
          refreshCartState(state);
        }
      }
    },
    decreaseQuantity(state, action) {
      if (state.carts.carts.length > 0) {
        const item = state.carts.carts[0].products.find(
          (item) => item.id === action.payload
        );
        if (item && item.quantity > 1) {
          item.quantity -= 1;
          item.total = item.quantity * item.price;
          item.discountedTotal =
            item.total - (item.total * item.discountPercentage) / 100;
          refreshCartState(state);
        }
      }
    },
    clearCart(state) {
      state.carts.carts = [];
    },
  },
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
      })
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.carts.carts[0] = action.payload;
        refreshCartState(state);
      })
      .addCase(updateCart.rejected, (state) => {
        state.status = "error";
      });
  },
});

function refreshCartState(state: WritableDraft<IUserCarts>) {
  if (state.carts.carts.length > 0) {
    const cart = state.carts.carts[0];
    cart.totalQuantity = cart.products.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    cart.totalProducts = cart.products.length;
    cart.total = cart.products.reduce((acc, item) => acc + item.total, 0);
    cart.discountedTotal = cart.products.reduce(
      (acc, item) => acc + item.discountedTotal,
      0
    );
  }
}

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartsSlice.actions;

export default cartsSlice.reducer;
