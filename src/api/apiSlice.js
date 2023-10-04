// apiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),  // Adjust the baseUrl to your backend's base URL
  endpoints: (builder) => ({
    // Endpoint to fetch all posts
    getPosts: builder.query({
        query: () => 'posts'
    }),
    getCategories: builder.query({
        query: () => 'categories' // Adjust this to the correct endpoint for fetching categories.
    }),
    getUserId: builder.query({
        query: (username) => `user/${username}` // Assuming this is the endpoint to fetch a user by username.
    }),    
    // Endpoint to create a new post
    addPost: builder.mutation({        
        query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
        }),
        transformResponse: (response, meta) => {        
        console.log(`newPost:${newPost}`);
        console.log(`response:${response}`);
        console.log(`query:${query}`);
        // Check for error response and handle it
        if (!response.success) {
            return { error: response.message };
        }
        return response;
        },
    }),
    
    
    // Endpoint to fetch comments for a specific post
    getComments: builder.query({
      query: (postId) => `posts/${postId}/comments`,
    }),
    
    // Endpoint to add a comment to a specific post
    addComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `posts/${postId}/comments`,
        method: 'POST',
        body: comment,
      }),
    }),
    
    // Add more endpoints as needed
  }),
});

// Export hooks for each endpoint
export const { 
  useGetPostsQuery, 
  useAddPostMutation, 
  useGetCommentsQuery, 
  useGetCategoriesQuery,
  useAddCommentMutation,
  useGetUserIdQuery
} = api;

// Export the generated reducer
export default api.reducer;
