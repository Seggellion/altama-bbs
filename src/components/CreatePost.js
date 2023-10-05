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

  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useGetCategoriesQuery();
  const { data: userIdData, error: userIdError } = useGetUserIdQuery(username);
  const [addPost, { isLoading: isPosting, isError, isSuccess }] = useAddPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userIdData) {
      alert('Invalid username entered.');
      return;
    }
    
    const postData = {
        user_id: parseInt(userIdData),  // Convert to integer
        forum_category_id: parseInt(category), // Use correct key and convert to integer
        title: title,
        body: body,
      };

    try {
      await addPost(postData);
      alert('Post created successfully!');
    } catch (error) {
      alert('Error creating post.');
    }
  };

  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error fetching categories.</div>;

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
        name="forum_category_id"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        >
            {categories && categories.map((categoryItem) => (
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
        <button type="submit" disabled={isPosting}>
          {isPosting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
