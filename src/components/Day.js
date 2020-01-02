import React, { useContext, useEffect, useState} from 'react';
import Task from './Task.js';
import {AppContext} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';
import TaskForm from './TaskForm.js';

function Day({ dayDate }) {

    const dayNumber = dayDate.getDate().toString();
    const dayShortName = [ "SUN" , "MON" , "TUE" , "WED" , "THU" , "FRI" , "SAT" ][dayDate.getDay()];
    const dayStartTime = dayDate.getTime();
    const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999); 

    // const [newTaskForm, setNewTaskForm] = useState();
    
    const [showTaskForm, setShowTaskForm] = useState(false);

    const { taskData, setNewTask } = useContext(AppContext);
    
    function setNewTaskHandler(newTaskToSet) {
        console.log("newTaskToSet", newTaskToSet);
        setShowTaskForm(false);
        setNewTask(newTaskToSet);
    }

    useEffect(() => {
        console.log('taskData set daytaks', taskData);
        setDayTasks(getTasks(dayStartTime, dayEndTime));
    }, [taskData.length])

    function getTasks(startTime, endTime) {
        debugger;
        console.log("------------------------------")
        console.log("startTime :"+startTime+", endTime:" + endTime+"  Day is: "+dayNumber);
        console.log("  taskDATA: ",taskData)
        let taskSetA = []; /* console.log( "new taskSetA: ", taskSetA); */
        let taskSet = taskData.filter( item =>  {
            return (item.time >= startTime && item.time < endTime) ;
        });  
        for (let i=0; i<taskData.length; i++){
            /* if (taskData[i].time >= startTime) {console.log("taskData[i].time >= startTime")}
            if (taskData[i].time < endTime) {console.log("taskData[i].time >= startTime")}  */
            if (taskData[i].time < endTime && taskData[i].time >= startTime) {
                taskSetA.push(taskData[i]);
                console.log("data[i] is : "+taskData[i]); 
            }
        }
        /* console.log( "taskData is now: ",taskData);
        console.log( "taskSetA: ", taskSetA); */
        return taskSetA;        
    }

    const [dayTasks, setDayTasks] = useState(getTasks(dayStartTime, dayEndTime));


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

    function getRandomString() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }

    function clickHandler(e){
        console.log("wat CLICK on day, new task dayTasks = ",dayTasks);
        setShowTaskForm(true);
        // setNewTaskForm(<TaskForm time={dayStartTime} setNewTask={setNewTask} />);
        /* const newDayTasks = getTasks(dayStartTime, dayEndTime);
        setDayTasks(newDayTasks); */
        
    }

    /* useEffect(() => {
        setDayTasks(getTasks(dayStartTime, dayEndTime));
    }, [taskData.length]); */

    const dayTitle = <div className="dayTitle"><h4>{dayNumber}</h4><p>{"("+dayShortName+")"}</p></div>

    return (
        <>
        <div className="day" onClick={clickHandler}/* onPointerDown={pointerDownHandler} onPointerUp={pointerUpHandler} */ >
            {dayTitle}
            {dayTasks.map( item => <Task key={item.key} taskData = {item}/>  ) }
        </div>
        {showTaskForm && <TaskForm time={dayStartTime} setNewTask={setNewTaskHandler} />}
        </>
    );
};

export default Day;