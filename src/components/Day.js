import React, { useContext } from 'react';
import Task from './Task.js';
import {AppContext, getTasks} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';

function Day(props) {

    const dayDate = new Date(props.dayDate);
    const dayNumber = dayDate.getDate().toString();
    const dayName = ["SUN" , "MON" , "TUR" , "WED" , "THE" , " FRI", "SAT"][dayDate.getDay()];

    /* const dayDate1 = new Date(dayDate);
    console.log(dayDate1) */
    const {getTasks} = useContext(AppContext);
    let dayTasks = getTasks();
    const dayTitle = <p className="dayTitle">{dayNumber+" ("+dayName+")"}</p>

    return (
        <div className="day">
            {dayTitle}
            <Task taskData = {dayTasks[0]} />
            <Task taskData = {dayTasks[0]} />
            <Task/>
        </div>
    );
};

export default Day;