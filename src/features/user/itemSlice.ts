import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";
import { Item } from "../../types/item";

interface ItemState {
  error: string;
  loading: boolean;
  items: Item[];
}

const initialState: ItemState = {
  error: "",
  loading: false,
  items: [],
};

export const fetchItems = createAsyncThunk(
  "user/items",
  async (request: { token: string }) => {
    const response = await api.get("/item", {
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });

    return response.data;
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.error = "";
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.error = action.error.message || "Error fetching all user items";
      state.loading = false;
    });
  },
});

export default itemSlice.reducer;
