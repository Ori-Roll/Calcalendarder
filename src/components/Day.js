import React, { useContext } from 'react';
import Task from './Task.js';
import {AppContext, getTasks} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';

function Day(props) {

    const dayDate = props.dayDate;
    const {getTasks} = useContext(AppContext);
    let dayTasks = getTasks();

    const dayTitle = <p className="dayTitle">{dayDate}</p>

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