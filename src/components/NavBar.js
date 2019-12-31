import React, { useContext } from "react";
import {AppContext} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';
import MenuBtn from './MenuBtn.js';
import DateSelectDrop from './DateSelectDrop.js';

function NavBar(props){
    
    const {currentDate} = useContext(AppContext);

    console.log(currentDate);
    
    return (
        <header className="nav-bar">
                <MenuBtn/>
                <DateSelectDrop/>
        </header>
    );
};

export default NavBar;