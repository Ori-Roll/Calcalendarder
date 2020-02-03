import React, { useContext, useEffect, useState, useRef} from 'react';
import { AppContext } from '../appContext.js';
import Task from './Task.js';
import TaskForm from './TaskForm.js';

let dateToSet = new Date();

const getDateWithoutTime = (date) => [date.getDate(), date.getMonth(), date.getFullYear()].join(' ');
const isSameDate = (date1, date2) => getDateWithoutTime(date1) === getDateWithoutTime(date2);

function Day({ dayDate, setWeekDefocus, taskMouseDownHandler }) {

    const dayNumber = dayDate.getDate().toString();
    const dayShortName = [ "SUN" , "MON" , "TUE" , "WED" , "THU" , "FRI" , "SAT" ][dayDate.getDay()];
    const dayStartTime = dayDate.getTime();
    const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999); 

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [newTaskTime, setNewTaskTime] = useState(new Date(dayDate));
    const [dayTasks, setDayTasks] = useState([]);
    
    const [initialTask, setInitialTask] = useState({});
    const [initTaskIsNew, setInitTaskIsNew] = useState(true);

    const [timeToolTopIsOn, setTimeToolTopIsOn] = useState(false);
    const [timeToolTipPosition, setTimeToolTipPosition] = useState({x:0, y:50});

    const { taskData, setTaskData, setNewTask, currentDate } = useContext(AppContext);
    const dayRef = useRef();

    const titleStyleChange = isSameDate(dayDate, currentDate) ? {color: "#f1e5c8", backgroundColor: "#4f6f8e"} : {};

    function setNewTaskHandler(newTaskToSet) {
        setShowTaskForm(false);
        setNewTask(newTaskToSet);
    }

    useEffect(
        () => {setDayTasks(getTasks(dayStartTime, dayEndTime)); console.log(taskData)},
        [taskData.length]
    );

    useEffect(() => { setDayTasks(getTasks(dayStartTime, dayEndTime)) }, []);

    function getTasks(startTime, endTime) {
        let taskSet = taskData.filter( item =>  {
                return (item.time >= startTime && item.time < endTime) ;
            });  
        return taskSet;   
    };

    function clickHandler(e){
        setInitTaskIsNew(true);

        const newTime = new Date(dayDate);
        const newEndDate = new Date(dateToSet);

        newTime.setHours(dateToSet.getHours());
        newTime.setMinutes(dateToSet.getMinutes());
        newEndDate.setHours(dateToSet.getHours()+2);
        /* setNewTaskTimeSet(newTime); */
        const emptyNewTask = {
            key: new Date().getTime().toString(), 
            time: newTime , 
            endDate: newEndDate , 
            title: "", 
            description: "" 
        };
        
        setNewTask(emptyNewTask);
        setInitialTask(emptyNewTask);
        
        setShowTaskForm(true);
        setWeekDefocus(true);
    };

    function taskClickHandler(task){
        setInitTaskIsNew(false);        
        setInitialTask(task);
        setShowTaskForm(true);
        setWeekDefocus(true);
    };

    function mouseMoveHandler(e){
        let timeNumValue = (( e.clientY - dayRef.current.offsetTop - 55 ) / 60) +7;
    
        let fixedHour = timeNumValue>7 ? Math.floor(timeNumValue) : 0;
        let fixedMin = timeNumValue>7 ? Math.floor( (timeNumValue - Math.floor(timeNumValue))*60 ) : 0;

        dateToSet.setHours(fixedHour);
        dateToSet.setMinutes(fixedMin);
        setTimeToolTipPosition({y: e.clientY-65});
        setNewTaskTime(dateToSet);
    };

    function taskMouseDownHandler(taskKey) {
        /* e.preventDefault();
        e.stopPropagation(); */
        /* setTaskData() */
        
        const taskIndex = taskData.findIndex(item => item.key===taskKey);
        taskData.splice(taskIndex, 1);
        console.log("taskIndex is: ", taskIndex);
    };

    const dayTitle = <div className="dayTitle" style={titleStyleChange}><h4 >{dayNumber}</h4><p >{"("+dayShortName+")"}</p></div>

    return (
        <>
        <div
            className="day" 
            ref={dayRef}
            onClick={clickHandler}
            onMouseMove={mouseMoveHandler} 
            onMouseOver={() => {setTimeToolTopIsOn(true)}} 
            onMouseLeave={() => {setTimeToolTopIsOn(false)}}
        >
            {dayTitle}
            {dayTasks.map( item => 
                <Task 
                        taskProps={item} 
                        onTaskClick={() => taskClickHandler(item)} 
                        taskMouseDownHandler={taskMouseDownHandler}
                />  ) }
            {timeToolTopIsOn && 
            <div 
                className="timeToolTip" 
                style={{ top: timeToolTipPosition.y }}>
                {newTaskTime.getHours()+":"+newTaskTime.getMinutes()}
            </div>}
        </div>
        {showTaskForm &&
            <TaskForm 
                initialTask={initialTask}
                isNew={initTaskIsNew}
                setWeekDefocus={setWeekDefocus}
                setShowTaskForm={setShowTaskForm}
            />}
        </>
    );
};

export default Day;
