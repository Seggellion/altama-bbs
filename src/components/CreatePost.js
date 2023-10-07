import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useAddPostMutation,
  useGetCategoriesQuery,
} from '../api/apiSlice';

function CreatePost() {
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const token = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage
  const isLoggedIn = !!token; // Check if the user is logged in
  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useGetCategoriesQuery();
  //const { data: userIdData, error: userIdError } = useGetUserIdQuery(username);
  const [addPost, { isLoading: isPosting, isError, isSuccess }] = useAddPostMutation();
  const navigate = useNavigate();
  const userIdData = 56;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting to submit");
    if (!userIdData) {
      alert('Invalid username entered.');
      return;
    }
    console.log("category", category);
    const postData = {
        user_id: userIdData,  // Convert to integer
        forum_category_id: parseInt(category), // Use correct key and convert to integer
        title: title,
        body: body,
      };
      console.log("Submitting form data:", postData);
    try {
      await addPost(postData);
      alert('Post created successfully!');
      navigate('/forums');  // Navigate to /forums URL
    } catch (error) {
      alert('Error creating post.');
    }
  };

  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error fetching categories.</div>;

  console.log(categories); 
  return (
    <div>
      {isLoggedIn ? (
        <>
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
              <option value="" disabled>Select a category</option>
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
        </>
      ) : (
        <p>Please log in to create a post.</p>
      )}
    </div>
  );
}

export default CreatePost;
