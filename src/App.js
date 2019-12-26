import React from 'react';
import './App.css';
import Week from './components/Week.js';
import NavBar from './components/NavBar.js';

function App() {
  return (
    <div className="app">
      <NavBar/>
      <Week/>
    </div>
  );
}

export default App;
