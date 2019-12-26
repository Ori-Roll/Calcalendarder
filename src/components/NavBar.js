import React, { useContext } from "react";
import {AppContext} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';

function NavBar(){
    
    const {currentDate} = useContext(AppContext);

    console.log(currentDate);

    return (
        <header className="nav-bar">
            <h1 className="logo">TC</h1>
            <button/>
        </header>
    );
};

export default NavBar;