// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import PostsList from './components/PostsList';
import CreatePost from './components/CreatePost';
import AppLayout from './components/AppLayout';
import Home from './components/Home';
import { getQueryParam } from './utils';
import './App.css';

function App() {
    // This useEffect runs when the App component mounts
    useEffect(() => {
      const token = getQueryParam('token');
      if (token) {
        localStorage.setItem('jwtToken', token);
      }
    }, []); // The empty array means this useEffect runs only once when the component mounts
  
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/post/:postId" element={<div>Post Detail Placeholder</div>} />
          <Route path="/forums" element={<PostsList />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
