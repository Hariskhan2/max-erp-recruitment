import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { JobPost, JobPostFormData } from '../../../types/jobPost';
import { jobPostsApi } from '../../../api/jobPosts';

interface JobPostsState {
  posts: JobPost[];
  loading: boolean;
  error: string | null;
  createStatus: 'idle' | 'loading' | 'success' | 'error';
  createError: string | null;
}

const initialState: JobPostsState = {
  posts: [],
  loading: false,
  error: null,
  createStatus: 'idle',
  createError: null
};

export const fetchJobPosts = createAsyncThunk(
  'jobPosts/fetchAll',
  async () => {
    const response = await jobPostsApi.getAllJobPosts();
    return response;
  }
);

export const createJobPost = createAsyncThunk(
  'jobPosts/create',
  async (data: JobPostFormData) => {
    const response = await jobPostsApi.createJobPost(data);
    return response;
  }
);

export const updateJobPost = createAsyncThunk(
  'jobPosts/update',
  async ({ id, data }: { id: number; data: JobPostFormData }) => {
    const response = await jobPostsApi.updateJobPost(id, data);
    return response;
  }
);

export const deleteJobPost = createAsyncThunk(
  'jobPosts/delete',
  async (id: number) => {
    await jobPostsApi.deleteJobPost(id);
    return id;
  }
);

const jobPostsSlice = createSlice({
  name: 'jobPosts',
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = 'idle';
      state.createError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobPosts.fulfilled, (state, action: PayloadAction<JobPost[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchJobPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch job posts';
      })
      .addCase(createJobPost.pending, (state) => {
        state.createStatus = 'loading';
        state.createError = null;
      })
      .addCase(createJobPost.fulfilled, (state, action: PayloadAction<JobPost>) => {
        state.createStatus = 'success';
        state.posts.unshift(action.payload);
      })
      .addCase(createJobPost.rejected, (state, action) => {
        state.createStatus = 'error';
        state.createError = action.error.message || 'Failed to create job post';
      })
      .addCase(updateJobPost.fulfilled, (state, action: PayloadAction<JobPost>) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deleteJobPost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  }
});

export const { resetCreateStatus } = jobPostsSlice.actions;
export default jobPostsSlice.reducer;