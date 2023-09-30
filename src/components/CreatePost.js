// CreatePost.js

import React, { useState } from 'react';
import { useAddPostMutation } from '../api/apiSlice';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addPost] = useAddPostMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content"></textarea>
      <button type="submit">Add Post</button>
    </form>
  );
}

export default CreatePost;
