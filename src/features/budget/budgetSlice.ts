import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";
import { Budget } from "../../types/budget";
import { signOut } from "../user/userSlice";
import { ApiVersion } from "../../api/api-versions.enum";

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
    const response = await api.get(ApiVersion.V1.valueOf() + "/budget", {
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
    const response = await api.post(
     "/budget",
      request.payload,
      {
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }
    );

    return response.data;
  }
);

export const deleteBudgetItem = createAsyncThunk(
  "budget/item/delete",
  async (request: {
    payload: { itemId: string; budgetId: string };
    token: string;
  }) => {
    const response = await api.delete(
     `/item/${request.payload.itemId}`,
      {
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }
    );

    return response.data;
  }
);

export const deleteBudget = createAsyncThunk(
  "budget/delete",
  async (request: { payload: { budgetId: string }; token: string }) => {
    const response = await api.delete(
     `/budget/${request.payload.budgetId}`,
      {
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }
    );

    return response.data;
  }
);

export const getBudgetItems = createAsyncThunk(
  "budget/items",
  async (request: { budgetId: string; token: string }) => {
    const response = await api.get(
     `/budget/${request.budgetId}/items`,
      {
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }
    );

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
    const response = await api.post(
     "/item/budget",
      request.payload,
      {
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      }
    );

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
      state.loading = false;
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
    builder.addCase(signOut, (state) => {
      state.budgets = [];
      state.error = "";
      state.loading = false;
    });

    builder.addCase(deleteBudgetItem.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteBudgetItem.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteBudgetItem.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Error occurred when deleting budget item";
    });

    builder.addCase(deleteBudget.fulfilled, (state, ) => {
      state.loading = false;
      state.error = "";
      // state.budgets = state.budgets.filter((budget) => budget.id !== action.payload.id);
    });
    builder.addCase(deleteBudget.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteBudget.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Error occurred when deleting budget";
    });
  },
});

export default budgetSlice.reducer;
