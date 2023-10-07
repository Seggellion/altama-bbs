// src/components/PostsList.js

import React from 'react';
import { useGetPostsQuery } from '../api/apiSlice';

function PostsList() {


  // Use the generated query hook
  const { data: posts, isLoading, isError } = useGetPostsQuery();
  console.log("query hook completed");
  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (isError || !posts) {
    return <div>Error loading posts</div>;
  }
  console.log(posts);
  // Render the list of posts
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {Array.isArray(posts) && posts.map((post) => (
          <li key={post.id}>{post.title}</li>  // Adjust based on your post structure
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
