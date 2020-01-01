import React, { useContext } from 'react';
import Task from './Task.js';
import {AppContext, getTasks} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';

function Day(props) {

    const {dayDate} = props;
    const dayNumber = dayDate.getDate().toString();
    const dayShortName = [ "SUN" , "MON" , "TUE" , "WED" , "THU" , "FRI" , "SAT" ][dayDate.getDay()];
    const dayStartTime = dayDate.getTime();
    const dayEndTime = dayDate.setHours(23, 59, 59, 999);   /* console.log("nextDay - "+new Date(dayEndTime)); */

    const {getTasks} = useContext(AppContext);
    let dayTasks = getTasks(dayStartTime, dayEndTime);

    const dayTitle = <div className="dayTitle"><h4>{dayNumber}</h4><p>{"("+dayShortName+")"}</p></div>

    let pointerDownY = 0;
    let pointerUpY = 0;

    function pointerDownHandler(e){
        pointerDownY = e.clientY;
        console.log("DOWN on day")
    }

    function pointerUpHandler(e){
        pointerUpY = e.clientY;
        pointerDownY === pointerUpY ? clickHandler(e) : console.log("UP on day")
    }

    function clickHandler(){
        console.log("CLICK on day")
    }

    return (
        <div className="day" onPointerDown={pointerDownHandler} onPointerUp={pointerUpHandler}>
            {dayTitle}
            {dayTasks.map( item => <Task key={item.key} taskData = {item}/>  ) }
        </div>
    );
};

export default Day;