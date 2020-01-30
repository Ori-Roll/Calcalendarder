import React, { useContext, useEffect, useState, useRef} from 'react';
import { AppContext } from '../appContext.js';
import Task from './Task.js';
import TaskForm from './TaskForm.js';

let dateToSet = new Date();

const getDateWithoutTime = (date) => [date.getDate(), date.getMonth(), date.getFullYear()].join(' ');
const isSameDate = (date1, date2) => getDateWithoutTime(date1) === getDateWithoutTime(date2);

function Day({ dayDate, setWeekDefocus }) {

    const dayNumber = dayDate.getDate().toString();
    const dayShortName = [ "SUN" , "MON" , "TUE" , "WED" , "THU" , "FRI" , "SAT" ][dayDate.getDay()];
    const dayStartTime = dayDate.getTime();
    const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999); 

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [newTaskTime, setNewTaskTime] = useState(new Date(dayDate));
    const [newTaskTimeSet, setNewTaskTimeSet] = useState(new Date(dayDate));
    const [dayTasks, setDayTasks] = useState([]);
    
    const [timeToolTopIsOn, setTimeToolTopIsOn] = useState(false);
    const [timeToolTipPosition, setTimeToolTipPosition] = useState({x:0, y:50});

    const { taskData, setNewTask, currentDate } = useContext(AppContext);
    const dayRef = useRef();

    const titleStyleChange = isSameDate(dayDate, currentDate) ? {color: "#f1e5c8", backgroundColor: "#4f6f8e"} : {};

    function setNewTaskHandler(newTaskToSet) {
        setShowTaskForm(false);
        setNewTask(newTaskToSet);
    }

    useEffect(
        () => { setDayTasks(getTasks(dayStartTime, dayEndTime)) },
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
        const newTime = new Date(dayDate);
        newTime.setHours(dateToSet.getHours());
        newTime.setMinutes(dateToSet.getMinutes());
        setNewTaskTimeSet(newTime);
        setShowTaskForm(true);
        setWeekDefocus(true);
    }

    function mouseMoveHandler(e){
        let timeNumValue = (( e.clientY - dayRef.current.offsetTop - 55 ) / 60) +7;
    
        let fixedHour = timeNumValue>7 ? Math.floor(timeNumValue) : 0;
        let fixedMin = timeNumValue>7 ? Math.floor( (timeNumValue - Math.floor(timeNumValue))*60 ) : 0;

        dateToSet.setHours(fixedHour);
        dateToSet.setMinutes(fixedMin);
        setTimeToolTipPosition({y: e.clientY-65});
        setNewTaskTime(dateToSet);
    };

    const dayTitle = <div className="dayTitle" style={titleStyleChange}><h4 >{dayNumber}</h4><p >{"("+dayShortName+")"}</p></div>

    function taskClickHandler(task){
        alert("clicked item yay!!!");

        //

        setShowTaskForm(true);

    };

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
            {dayTasks.map( item => <Task key={item.key} taskData={item} onTaskClick={() => taskClickHandler(item)} />  ) }
            {timeToolTopIsOn && <div className="timeToolTip" style={{ top: timeToolTipPosition.y }} 
                                >{newTaskTime.getHours()+":"+newTaskTime.getMinutes()}</div>}
        </div>
        {showTaskForm &&
        <TaskForm 
            time={newTaskTimeSet}
            setNewTask={setNewTaskHandler}
            setWeekDefocus={setWeekDefocus}
        />}
        </>
    );
};

export default Day;
