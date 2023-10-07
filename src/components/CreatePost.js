import React, { useState, useEffect } from 'react'; // Add useEffect
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode"; // Import jwt_decode
import '../CreatePost.css';

import {
  useAddPostMutation,
  useGetCategoriesQuery,
} from '../api/apiSlice';

function CreatePost() {
  const [userId, setUserId] = useState(null); // Add state for userId
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const token = localStorage.getItem('jwtToken'); // Make sure this is the correct key
  const isLoggedIn = !!token;
  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useGetCategoriesQuery();
  const [addPost, { isLoading: isPosting, isError, isSuccess }] = useAddPostMutation();
  const navigate = useNavigate();

  // Decode the JWT to get the user ID
  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUserId(decoded.user_id);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('You must be logged in to create a post.');
      return;
    }
    const postData = {
      user_id: userId,
      forum_category_id: parseInt(category),
      title: title,
      body: body,
    };
    try {
      await addPost(postData);
      alert('Post created successfully!');
      navigate('/forums');
    } catch (error) {
      alert('Error creating post.');
    }
  };

  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error fetching categories.</div>;

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>Create New Post</h2>
          <form onSubmit={handleSubmit}>
            <select
              className="form-element" // Apply the CSS class
              // ... (existing props)
            >
              {/* ... (existing options) */}
            </select>
            <input
              className="form-element" // Apply the CSS class
              // ... (existing props)
            />
            <textarea
              className="form-element" // Apply the CSS class
              // ... (existing props)
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
