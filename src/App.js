// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostsList from './components/PostsList';
import AppLayout from './components/AppLayout';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route path="/post/:postId">
            {/* Placeholder for individual post details. You can create and import a PostDetail component later. */}
            {/* <PostDetail /> */}
            <div>Post Detail Placeholder</div>
          </Route>
          
          <Route path="/" exact>
            <PostsList />
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  );
}

export default App;
