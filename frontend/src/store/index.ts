import { configureStore } from '@reduxjs/toolkit';
import jobPostsReducer from './reducers/jobPostsSlice';

export const store = configureStore({
  reducer: {
    jobPosts: jobPostsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;