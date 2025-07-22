import axios from 'axios';
import { JobPost, JobPostFormData } from '../types/jobPost';

const API_BASE_URL = 'http://localhost:5000/api';

export const jobPostsApi = {
  async getAllJobPosts(): Promise<JobPost[]> {
    const response = await axios.get(`${API_BASE_URL}/job-posts`);
    return response.data;
  },

  async createJobPost(data: JobPostFormData): Promise<JobPost> {
    const response = await axios.post(`${API_BASE_URL}/job-posts`, data);
    return response.data;
  },

  async getJobPost(id: number): Promise<JobPost> {
    const response = await axios.get(`${API_BASE_URL}/job-posts/${id}`);
    return response.data;
  },

  async updateJobPost(id: number, data: JobPostFormData): Promise<JobPost> {
    const response = await axios.put(`${API_BASE_URL}/job-posts/${id}`, data);
    return response.data;
  },

  async deleteJobPost(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/job-posts/${id}`);
  }
};