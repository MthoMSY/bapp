import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { api } from "../../api";
import { act } from "react";

interface UserState {
  isLoggedIn: boolean;
  username: string;
  token: string;
  userId: string;
  error: string;
  loading: boolean;
  isSignedUp: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  username: "",
  token: "",
  userId: "",
  error: "",
  loading: false,
  isSignedUp: false,
};

export const signIn = createAsyncThunk(
  "user/signin",
  async (request: { username: string; password: string }) => {
    const response = await api.post("/auth/signin", request);

    return response.data;
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async (request: { username: string; password: string }) => {
    const response = await api.post("/auth/signup", request);

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.error = "";
      state.loading = false;
      state.isSignedUp = false;
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.error.message || 'Error signing in';
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state = initialState;
      state.isSignedUp = true
    });

    builder.addCase(signUp.pending, (state) => {
      state = initialState;
      state.loading = true
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state = initialState;
      state.error = action.error.message || 'Error signing up'
    });
  },
});

export const { signOut } = userSlice.actions;

export const selectLoggedInUser = (state: RootState) => state.user;

export default userSlice.reducer;
