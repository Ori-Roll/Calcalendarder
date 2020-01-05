import React, { useContext, useEffect, useState} from 'react';
import Task from './Task.js';
import {AppContext} from '../appContext.js';
import TaskForm from './TaskForm.js';
import TimeRuler from './TimeRuler.js';

function Day({ dayDate }) {

    const dayNumber = dayDate.getDate().toString();
    const dayShortName = [ "SUN" , "MON" , "TUE" , "WED" , "THU" , "FRI" , "SAT" ][dayDate.getDay()];
    const dayStartTime = dayDate.getTime();
    const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999); 
    
    // const [newTaskForm, setNewTaskForm] = useState();
    
    const [showTaskForm, setShowTaskForm] = useState(false);

    const { taskData, setNewTask, currentDate } = useContext(AppContext);
    
    const titleStyleChange = (
        dayDate.getDay()===currentDate.getDay() ? {color: "#f1e5c8", backgroundColor: "#4f6f8e"} : {} )
    

    function setNewTaskHandler(newTaskToSet) {
        console.log("THIS!!!   -   -  - NewTaskToSet", newTaskToSet);
        setShowTaskForm(false);
        setNewTask(newTaskToSet);
    }

    useEffect(() => {
        console.log('taskData set daytaks', taskData);
        setDayTasks(getTasks(dayStartTime, dayEndTime));
    }, [taskData.length]);

    function getTasks(startTime, endTime) {
        console.log("START getTask, TASKDATA = ",taskData);
        console.log("DAY is = ",dayDate);
        let taskSet = taskData.filter( item =>  {
            return (item.time >= startTime && item.time < endTime) ;
        });  
        console.log("END getTask, TASKDATA = ",taskData);    
        return taskSet;   
        
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

    const dayTitle = <div className="dayTitle" style={titleStyleChange}><h4 >{dayNumber}</h4><p >{"("+dayShortName+")"}</p></div>

    return (
        <>
        {/* <TimeRuler/> */}
        <div className="day" onClick={clickHandler}/* onPointerDown={pointerDownHandler} onPointerUp={pointerUpHandler} */ >
            {dayTitle}
            {dayTasks.map( item => <Task key={item.key} taskData = {item}/>  ) }
        </div>
        
        {showTaskForm && <TaskForm time={dayStartTime} setNewTask={setNewTaskHandler} />}
        </>
    );
};

export default Day;


//                                      OLD 
// --------------------------------------------------------------------------------

        // IN GET TASKS
        /* console.log("------------------------------")
        console.log("startTime :"+startTime+", endTime:" + endTime+"  Day is: "+dayNumber);
        console.log("  taskDATA: ",taskData) */
        
        /* for (let i=0; i<taskData.length; i++){
            if (taskData[i].time >= startTime) {console.log("taskData[i].time >= startTime")}
            if (taskData[i].time < endTime) {console.log("taskData[i].time >= startTime")} 
            if (taskData[i].time < endTime && taskData[i].time >= startTime) {
                taskSetA.push(taskData[i]);
                console.log("data[i] is : "+taskData[i]); 
            }
        } */
        /* console.log( "taskData is now: ",taskData);
        console.log( "taskSetA: ", taskSetA); */  