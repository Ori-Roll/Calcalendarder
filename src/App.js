import React from 'react';
import './App.css';
import Week from './components/Week.js';
import SideBar from './components/SideBar.js';
import NavBar from './components/NavBar.js';

function App() {
  return (
    <div className="app">
      <NavBar/>
      <SideBar/>
      <Week/>
    </div>
  );
}

export default App;
