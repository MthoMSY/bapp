import {
  type PayloadAction,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { api } from "../../client.ts";

interface UserState {
  isLoggedIn: boolean;
  username: string;
  token: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  username: "",
  token: "",
};

export const signIn = createAsyncThunk(
  "user/signin",
  async (request: { username: string; password: string }) => {
    const response = await api.post("/auth/signin", request);

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.password;
      state.username = action.payload.username;
    },
    logOut: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.accessToken;
    });
  },
});

export const { logOut, logIn } = userSlice.actions;

export const selectLoggedInUser = (state: RootState) => state.user;

export default userSlice.reducer;
