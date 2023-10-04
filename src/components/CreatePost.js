import React, { useState } from 'react';
import { useAddPostMutation } from '../api/apiSlice';

function CreatePost() {
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [addPost] = useAddPostMutation();
  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();
  const { data: categories } = useGetCategoriesQuery();


    // Function to handle form submission
    const handleSubmit = async (formData) => {
        try {
            // Fetch the userId based on the usernameValue
            const userIdResponse = await useGetUserIdQuery(usernameValue);
    
            if (userIdResponse && userIdResponse.data) {
                // Add the user_id to the formData
                formData.user_id = userIdResponse.data;
    
                // Proceed to add the post
                const postResponse = await addPost(formData);
                if (postResponse && postResponse.data) {
                    console.log('Post added successfully');
                } else {
                    console.error('Error adding post.');
                }
            } else {
                console.error('Invalid username entered.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
/*
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
*/
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
        <select name="category" value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)}>
        {categories.map(category => (
            <option key={category.name} value={category.name}>
            {category.name}
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
