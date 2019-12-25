import React, { useContext } from 'react';
import Task from './Task.js';
import {AppContext} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';

function Day(props) {

    let dayTitle = <p className="dayTitle">This is the day</p>
    let dayContent = [<p className="task">task1</p>, <p  className="task">task2</p>, <p  className="task">task3</p>]

    const {taskData} = useContext(AppContext);
    /* console.log(taskData); */
    return (
        <div className="day">
            {dayTitle}
            <Task taskData = {taskData[0]} />
            <Task taskData = {taskData[1]} />
            <Task/>
        </div>
    );
};

export default Day;