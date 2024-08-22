import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: number | null;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

interface IUserState {
  status: string;
  user: IUser;
}

const initialState: IUserState = {
  status: "loading", // 'loading', 'error', 'ready'
  user: {
    id: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: "",
    refreshToken: "",
  },
};

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username, // "emilys"
        password: password, // "emilyspass"
        // expiresInMins: 30, // optional, defaults to 60
      }),
    });

    if (!response.ok) throw new Error("Failed to login!");

    const data: IUser = await response.json();
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "ready";
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default userSlice.reducer;
