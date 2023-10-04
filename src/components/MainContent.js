import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostsQuery, useGetPostByIdQuery } from '../api/apiSlice';
import { Box, Text } from 'grommet';

function MainContent() {
  const { postId } = useParams();

  // If postId exists, we're viewing a single post.
  if (postId) {
    const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);

    if (isLoading) return <Text>Loading post...</Text>;
    if (isError || !post) return <Text>Error loading the post</Text>;

    return (
      <Box pad="medium">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        {/* Here, you can also display comments related to this post if required */}
      </Box>
    );
  }

  // Otherwise, we're viewing the list of posts.
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <Text>Loading posts...</Text>;
  if (isError || !posts) return <Text>Error loading posts</Text>;

  return (
    <Box pad="medium">
      <h2>Forum Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* Linking to individual post view */}
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default MainContent;
