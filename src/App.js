import React, {useState} from 'react';
import './App.css';
import Week from './components/Week.js';
import SideBar from './components/SideBar.js';
import NavBar from './components/NavBar.js';
import TaskForm from './components/TaskForm.js';

function App() {
  
  const [form, setForm] = useState();

  function submitForm(form){
  }

  function appHandleClick(){
      form ? submitForm(form) : setForm( () => <TaskForm setForm={setForm} time ={new Date('2019-12-30T01:00:00').getTime()}/>);
  }


  return (
    <div className="app" /* onClick={appHandleClick } */>
      <NavBar/>
      <SideBar/>
      <Week/>
      {form}
    </div>
  );
}

export default App;
