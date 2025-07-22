import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchJobPosts, createJobPost, deleteJobPost, resetCreateStatus } from '../store/reducers/jobPostsSlice';
import { JobPostFormData } from '../types/jobPost';

export const useJobPosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, createStatus, createError } = useSelector(
    (state: RootState) => state.jobPosts
  );

  const loadJobPosts = () => {
    dispatch(fetchJobPosts());
  };

  const addJobPost = (data: JobPostFormData) => {
    return dispatch(createJobPost(data));
  };

  const deletePost = (id: number) => {
    return dispatch(deleteJobPost(id));
  };

  const clearCreateStatus = () => {
    dispatch(resetCreateStatus());
  };

  return {
    posts,
    loading,
    error,
    createStatus,
    createError,
    loadJobPosts,
    addJobPost,
    deletePost,
    clearCreateStatus
  };
};