// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import PostsList from './components/PostsList';
import AppLayout from './components/AppLayout';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/post/:postId" element={<div>Post Detail Placeholder</div>} />
          <Route path="/forums" element={<PostsList />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
