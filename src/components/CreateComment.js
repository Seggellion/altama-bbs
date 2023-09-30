// CreateComment.js

import React, { useState } from 'react';
import { useAddCommentMutation } from '../api/apiSlice';

function CreateComment({ postId }) {
  const [text, setText] = useState('');
  const [addComment] = useAddCommentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ postId, comment: { text } });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment"></textarea>
      <button type="submit">Comment</button>
    </form>
  );
}

export default CreateComment;
