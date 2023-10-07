// src/components/PostsList.js

import React from 'react';
import { useGetPostsQuery } from '../api/apiSlice';

function PostsList() {
  // Use the generated query hook
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (isError || !posts) {
    return <div>Error loading posts</div>;
  }

  // Render the list of posts
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {Array.isArray(posts) && posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> {/* Post Title */}
            <span> by {post.username} </span> {/* Username */}
            <span> at {new Date(post.created_at).toLocaleString()} </span> {/* Created At */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
