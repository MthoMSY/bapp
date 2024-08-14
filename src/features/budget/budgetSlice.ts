import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";
import { Budget } from "../../types/budget";
import { signOut } from "../user/userSlice";

interface BudgetState {
  error: string;
  loading: boolean;
  budgets: Budget[];
}

const initialState: BudgetState = {
  error: "",
  loading: false,
  budgets: [],
};

export const fetchBudgets = createAsyncThunk(
  "budgets/all",
  async (request: { token: string }) => {
    const response = await api.get("/budget", {
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });

    return response.data;
  }
);

export const createBudget = createAsyncThunk(
  "budget/",
  async (request: {
    payload: { name: string; description: string };
    token: string;
  }) => {
    const response = await api.post("/budget", request.payload, {
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });

    return response.data;
  }
);

export const getBudgetItems = createAsyncThunk(
  "budget/items",
  async (request: { budgetId: string; token: string }) => {
    const response = await api.get(`budget/${request.budgetId}/items`, {
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });

    return response.data;
  }
);
export const createBudgetItem = createAsyncThunk(
  "budget/item/create",
  async (request: {
    payload: {
      name: string;
      description: string;
      cost: number;
      budgetId: string;
    };
    token: string;
  }) => {
    const response = await api.post("/item/budget", request.payload, {
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    });

    return response.data;
  }
);

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBudgets.rejected, (state) => {
      state.loading = false;
      state.budgets = [];
    });
    builder.addCase(fetchBudgets.fulfilled, (state, action) => {
      state.budgets = action.payload.map((budget: Budget) => {
        return { ...budget };
      });
      state.loading = false;
    });
    builder.addCase(fetchBudgets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBudget.fulfilled, (state, action) => {
      const newBudget = action.payload as Budget;
      state.budgets.push(newBudget);
    });
    builder.addCase(createBudget.rejected, (state, action) => {
      state.error =
        action.error.message || "Error occurred when creating budget";
    });
    builder.addCase(getBudgetItems.rejected, (state) => {
      state.loading = false;
      state.budgets = [];
    });
    builder.addCase(getBudgetItems.fulfilled, (state, action) => {
      state.budgets = action.payload.map((budget: Budget) => {
        return { ...budget };
      });
      state.loading = false;
    });
    builder.addCase(getBudgetItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signOut, (state, action) => {
        state.budgets = []
        state.error = ""
        state.loading = false
    })
  },
});


export default budgetSlice.reducer;
