import React, { useState } from 'react';
import { useAddPostMutation } from '../api/apiSlice';

function CreatePost() {
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [addPost] = useAddPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here, you'd make an API call to get the user_id from the entered username.
    // For demonstration purposes, I'll assume a dummy user_id.
    const userId = 1;  // Dummy value, replace this with the actual user_id from the API call.

    try {
      await addPost({ userId, category, title, body });
      alert('Post created successfully!');
    } catch (error) {
      alert('Error creating post.');
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
