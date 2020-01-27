import React, { useContext, useEffect, useState, useRef} from 'react';
import { AppContext } from '../appContext.js';
import Task from './Task.js';
import TaskForm from './TaskForm.js';
import TimeRuler from './TimeRuler.js';

let dateToSet = new Date();

function Day({ dayDate, weekDefocus, setWeekDefocus }) {

    const dayNumber = dayDate.getDate().toString();
    const dayShortName = [ "SUN" , "MON" , "TUE" , "WED" , "THU" , "FRI" , "SAT" ][dayDate.getDay()];
    const dayStartTime = dayDate.getTime();
    const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999); 

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [newTaskTime, setNewTaskTime] = useState(new Date(dayDate));
    const [newTaskTimeSet, setNewTaskTimeSet] = useState(new Date(dayDate));
    const [dayTasks, setDayTasks] = useState([]);
    /* const hoursToDisplay = [{key: dayNumber*10+1, hour: "06:00", index: 1}, {key: dayNumber*102, hour: "07:00", index: 2}, {key: 3, hour: "08:00", index: 3}, {key: 4, hour: "09:00", index: 4}, {key: 5, hour: "10:00", index: 5}, {key: 6, hour: "11:00", index: 6}, {key: 7, hour: "12:00", index: 7}, {key: 8, hour: "13:00", index: 8}, {key: 9, hour: "14:00", index: 9}, {key: 10, hour: "15:00", index: 10}, {key: 11, hour: "16:00", index: 11},{key: 12, hour: "17:00", index: 12}, {key: 13, hour: "18:00", index: 13}, {key: 14, hour: "19:00", index: 14}, {key: 1, hour: "20:00", index: 15}]; */
    /* const [changeRulerHourStyle, setChangeRulerHourStyle] = useState({}); */
    const [timeToolTopIsOn, setTimeToolTopIsOn] = useState(false);
    const [timeToolTipPosition, setTimeToolTipPosition] = useState({x:0, y:50});

    const { taskData, setNewTask, currentDate } = useContext(AppContext);
    const dayRef = useRef();

    const titleStyleChange =    [ dayDate.getDate(), dayDate.getMonth(), dayDate.getFullYear()].join() ===
                                [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()].join() ?
                                {color: "#f1e5c8", backgroundColor: "#4f6f8e"} : {};
    

    function setNewTaskHandler(newTaskToSet) {
        /* console.log("THIS!!!   -   -  - NewTaskToSet", newTaskToSet); */
        setShowTaskForm(false);
        setNewTask(newTaskToSet);
    }

    useEffect(() => {
        setDayTasks(()=>getTasks(dayStartTime, dayEndTime)); }, [taskData.length]);

    useEffect( ()=>{
        setDayTasks(getTasks(dayStartTime, dayEndTime))} ,[]);

    function getTasks(startTime, endTime) {
        let taskSet = taskData.filter( item =>  {
                return (item.time >= startTime && item.time < endTime) ;
            });  
        return taskSet;   
    };

    let pointerDownY, pointerUpY = 0;

    /* function pointerDownHandler(e){
        pointerDownY = e.clientY;
    }

    function pointerUpHandler(e){
        pointerUpY = e.clientY;
        pointerDownY === pointerUpY ? clickHandler(e) : console.log("UP on day")
    } */

    function getRandomString() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }

    function clickHandler(e){
        console.log("wat CLICK on day, new task dayTasks = ",dayTasks);
        let posiitonOfCLick = e.clientY-dayRef.current.offsetTop;
        /* let clickedTime = posiitonOfCLick/60+7; */
        /* clickedTime.splice(2, 0, " ");  console.log (clickedTime);*/
        /* setNewTaskTime(clickedTime); */
        const newTime = new Date(dayDate);
        newTime.setHours(dateToSet.getHours());
        newTime.setMinutes(dateToSet.getMinutes());
        /* newTime.setMinutes(dateToSet.getMinutes()) */
        setNewTaskTimeSet(newTime);
        console.log("setNewTaskTime!!!!!!!!!!!!!!!!!!!!!!!!! " + newTime, typeof(newTime));
        setShowTaskForm(true);
        setWeekDefocus(true);
        
        /* const newDayTasks = getTasks(dayStartTime, dayEndTime);
        setDayTasks(newDayTasks); */
        /* console.log("clickedTime is: "+clickedTime); */
        /* setTaskFormFormat( <TaskForm time={dayStartTime} setNewTask={setNewTaskHandler}/> ); */
        /* setShowTaskForm(true); */
    }

    function mouseMoveHandler(e){
        /* let boundingDayPosition =  dayRef.current.offsetLeft;   */
        let timeNumValue = (( e.clientY - dayRef.current.offsetTop - 55 ) / 60) +7;
    
        let fixedHour = timeNumValue>7 ? Math.floor(timeNumValue) : 0;
        let fixedMin = timeNumValue>7 ? Math.floor( (timeNumValue - Math.floor(timeNumValue))*60 ) : 0;

        dateToSet.setHours(fixedHour);
        dateToSet.setMinutes(fixedMin);
        setTimeToolTipPosition({y: e.clientY-65});
        setNewTaskTime(dateToSet);
    };

    const dayTitle = <div className="dayTitle" style={titleStyleChange}><h4 >{dayNumber}</h4><p >{"("+dayShortName+")"}</p></div>

    return (
        <>
        <div
            className="day" 
            ref={dayRef}
            onClick={clickHandler}/* onPointerDown={pointerDownHandler} onPointerUp={pointerUpHandler} */ 
            onMouseMove={mouseMoveHandler} 
            onMouseOver={() => {setTimeToolTopIsOn(true)}} 
            onMouseLeave={() => {setTimeToolTopIsOn(false)}}
        >
            {/* <TimeRuler  hoursToDisplay={hoursToDisplay} />*/}
            {dayTitle}
            {dayTasks.map( item => <Task key={item.key} taskData = {item}/>  ) }
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


        // from set title style change setTitleStyleChange
        /* let dayX = [ dayDate.getDate(), dayDate.getMonth(), dayDate.getFullYear()].join();
        let currentX = [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()].join();
        return dayX===currentX ? {color: "#f1e5c8", backgroundColor: "#4f6f8e"} : {};  */
        /* function setTitleStyleChange (){
            return [ dayDate.getDate(), dayDate.getMonth(), dayDate.getFullYear()].join() === [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()].join() ?
            {color: "#f1e5c8", backgroundColor: "#4f6f8e"} : {};
        }; */

        /* mouseMoveHandler */
        //--------------------------------------
        /*  if(e.target.className === "time-ruler-text" ) { 
            let mouseYPosOnDay = e.target.parentElement.clientY - boundingDayRect.top;
            console.log(e.target.parentElement.style.top);
        } */
        /* let timeNumValue = ( e.clientY - dayRef.current.offsetTop - 50 ) / 60 ;
        console.log(timeNumValue-50);
        let fixedHour = Math.sign(timeNumValue)===1 ? Math.floor(timeNumValue) : 0;
        console.log("timeNumValue.toFixed  : " + Math.floor( (timeNumValue - Math.floor(timeNumValue))*60 ) );
        let fixedMin = Math.sign(timeNumValue)===1 ? Math.floor( (timeNumValue - Math.floor(timeNumValue))*60 ) : 0;
        console.log("timeNumValue is "+timeNumValue);
        if (dayRef.current.offsetTop>50) { timeSetValue.setHours(10,10,0,0) } ;
        console.log("timeSetValue is : "+timeSetValue);
        setNewTaskTime(timeSetValue); */
        /* if (e.target.offsetTop < timeNumValue+50) {e.target.style={color: "black"}}; */
        /* setChangeRulerHourStyle({opacity: (timeNumValue-e.clientY)/0.1/1000 }) ;
        console.log(changeRulerHourStyle) */

        /*     let fixedHour = Math.sign(timeNumValue*60)===1 ? Math.floor(timeNumValue) : 0;
        let fixedMin = Math.sign(timeNumValue*60)===1 ? Math.floor( (timeNumValue - Math.floor(timeNumValue))*60 ) : 0; */