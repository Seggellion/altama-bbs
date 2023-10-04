// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import PostsList from './components/PostsList';
import AppLayout from './components/AppLayout';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/post/:postId">
            {/* Placeholder for individual post details. You can create and import a PostDetail component later. */}
            <div>Post Detail Placeholder</div>
          </Route>
          
          <Route path="/forums" element={<PostsList />} />

          <Route path="/" element={<Redirect to="/forums" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
