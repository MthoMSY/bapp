import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import itemReducer from '../features/user/itemSlice'
// ...
export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch