import React, { useContext } from "react";
import {AppContext} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';

function NavBar(){
    
    const {currentDate} = useContext(AppContext);

    console.log(currentDate);
    

    return (
        <header className="nav-bar">
            <nav>
                <ul className="a-a">
                    <li>1-----1</li>
                    <li>2-----2</li>
                    <li>3-----3</li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;