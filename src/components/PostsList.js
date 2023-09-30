// PostList.js

import React from 'react';
import { useGetPostsQuery } from '../api/apiSlice';
import Post from './Post';

function PostList() {
  const { data: posts, isLoading } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default PostList;
