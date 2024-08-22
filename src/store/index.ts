import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import budgetReducer from "../features/budget/budgetSlice";
// ...
export const store = configureStore({
  reducer: {
    user: userReducer,
    budget: budgetReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
