// CommentList.js

import React from 'react';
import { useGetCommentsQuery } from '../api/apiSlice';
import Comment from './Comment';

function CommentList({ postId }) {
  const { data: comments, isLoading } = useGetCommentsQuery(postId);

  if (isLoading) return <div>Loading comments...</div>;

  return (
    <div>
      {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
}

export default CommentList;
