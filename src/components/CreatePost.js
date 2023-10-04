import React, { useState } from 'react';
import {
  useAddPostMutation,
  useGetCategoriesQuery,
  useGetUserIdQuery,
} from '../api/apiSlice';

function CreatePost() {
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { data: categories } = useGetCategoriesQuery();
  const { data: userIdData, error: userIdError } = useGetUserIdQuery(username);
  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userIdData) {
      const postData = {
        user_id: userIdData,
        category,
        title,
        body,
      };

      try {
        await addPost(postData);
        alert('Post created successfully!');
      } catch (error) {
        alert('Error creating post.');
      }
    } else {
      alert('Invalid username entered.');
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
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories &&
            categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </option>
            ))}
        </select>
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
