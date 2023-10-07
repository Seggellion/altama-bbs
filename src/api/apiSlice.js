// apiSlice.js
import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

const axiosBaseQuery = ({ baseUrl }) => async ({ url, method, data }) => {
  const token = localStorage.getItem('jwtToken');  // Retrieve JWT token from local storage

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const result = await axios({ url: baseUrl + url, method, data, headers });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError;
    if (axiosError.response) {
      err = new Error('API Server Error');
      err.data = axiosError.response.data;
      err.status = axiosError.response.status;
    }
    throw err;
  }
};

export const api = createApi({
  tagTypes: ['Post'],
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    getCategories: builder.query({
      query: () => 'categories',
    }),
    getUserId: builder.query({
      query: (username) => `user/${username}`,
    }),
    addPost: builder.mutation({
      query: (newPost) => {
        const token = "YOUR_JWT_TOKEN"; // Retrieve this from where you're storing it
        return {
          url: 'posts',
          method: 'POST',
          data: newPost,
          headers: {
            'Authorization': `Bearer ${token}`
          },
        };
      },
      transformResponse: (response, meta) => {
        if (!response.success) {
          return { error: response.message };
        }
        return response;
      },
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    getComments: builder.query({
      query: (postId) => `posts/${postId}/comments`,
    }),
    addComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `posts/${postId}/comments`,
        method: 'POST',
        data: comment,
      }),
    }),
  }),
});

export const { 
  useGetPostsQuery, 
  useAddPostMutation, 
  useGetCommentsQuery, 
  useGetCategoriesQuery,
  useAddCommentMutation,
  useGetUserIdQuery
} = api;

export default api.reducer;
