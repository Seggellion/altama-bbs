// src/App.js

import React from 'react';
import { Grommet } from 'grommet';
import PostsList from './components/PostsList';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Grommet>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Altama BBS</h1>
        </header>
        <main>
          <PostsList />
          {/* Other components go here */}
        </main>
      </div>
    </Grommet>
  );
}

export default App;