import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { api } from "../../api";
import { Budget } from "../../types/budget";

interface UserState {
  isLoggedIn: boolean;
  username: string;
  token: string;
  userId: string;
  error: string;
  loading: boolean;
  // isSignedUp: boolean;
  // budget stuff
  isLoadingBudgets: boolean;
  budgets: Budget[];
}

const initialState: UserState = {
  isLoggedIn: false,
  username: "",
  token: "",
  userId: "",
  error: "",
  loading: false,
  isLoadingBudgets: false,
  budgets: [],
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

export const fetchBudgets = createAsyncThunk(
  "user/budgets/all",
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
  "user/budget/",
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
  "user/budget/items",
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
  "user/item/budget",
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state = initialState;
      localStorage.removeItem("token");
    },
    restoreLoginFromLocalStorage: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isLoggedIn = true;
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
      localStorage.setItem("token", state.token);
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.error.message || "Error signing in";
      state.loading = false;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error signing up";
    });
    builder.addCase(fetchBudgets.rejected, (state) => {
      state.isLoadingBudgets = false;
      state.budgets = [];
    });
    builder.addCase(fetchBudgets.fulfilled, (state, action) => {
      state.budgets = action.payload.map((budget: Budget) => {
        return { ...budget };
      });
      state.isLoadingBudgets = false;
    });
    builder.addCase(fetchBudgets.pending, (state) => {
      state.isLoadingBudgets = true;
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
      state.isLoadingBudgets = false;
      state.budgets = [];
    });
    builder.addCase(getBudgetItems.fulfilled, (state, action) => {
      state.budgets = action.payload.map((budget: Budget) => {
        return { ...budget };
      });
      state.isLoadingBudgets = false;
    });
    builder.addCase(getBudgetItems.pending, (state) => {
      state.isLoadingBudgets = true;
    });
  },
});

export const { signOut, restoreLoginFromLocalStorage } = userSlice.actions;

export const selectLoggedInUser = (state: RootState) => state.user;

export default userSlice.reducer;
