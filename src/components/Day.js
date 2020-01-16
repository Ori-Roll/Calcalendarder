import React, { useContext, useEffect, useState, useRef} from 'react';
import { AppContext } from '../appContext.js';
import Task from './Task.js';
import TaskForm from './TaskForm.js';
import TimeRuler from './TimeRuler.js';

function Day({ dayDate }) {

    const dayNumber = dayDate.getDate().toString();
    const dayShortName = [ "SUN" , "MON" , "TUE" , "WED" , "THU" , "FRI" , "SAT" ][dayDate.getDay()];
    const dayStartTime = dayDate.getTime();
    const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999); 

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskFormFormat, setTaskFormFormat] = useState( <TaskForm time={dayStartTime} setNewTask={setNewTaskHandler}/> )
    const [dayTasks, setDayTasks] = useState([]);
    const hoursToDisplay = [{key: dayNumber*10+1, hour: "06:00", index: 1}, {key: dayNumber*102, hour: "07:00", index: 2}, {key: 3, hour: "08:00", index: 3}, {key: 4, hour: "09:00", index: 4}, {key: 5, hour: "10:00", index: 5}, {key: 6, hour: "11:00", index: 6}, {key: 7, hour: "12:00", index: 7}, {key: 8, hour: "13:00", index: 8}, {key: 9, hour: "14:00", index: 9}, {key: 10, hour: "15:00", index: 10}, {key: 11, hour: "16:00", index: 11},{key: 12, hour: "17:00", index: 12}, {key: 13, hour: "18:00", index: 13}, {key: 14, hour: "19:00", index: 14}, {key: 1, hour: "20:00", index: 15}];
    const [changeRulerHourStyle, setChangeRulerHourStyle] = useState({});

    const { taskData, setNewTask, currentDate } = useContext(AppContext);
    const dayRef = useRef();
    
    const titleStyleChange =    [ dayDate.getDate(), dayDate.getMonth(), dayDate.getFullYear()].join() ===
                                [currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear()].join() ?
                                {color: "#f1e5c8", backgroundColor: "#4f6f8e"} : {};
    

    function setNewTaskHandler(newTaskToSet) {
        console.log("THIS!!!   -   -  - NewTaskToSet", newTaskToSet);
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
        
        // setNewTaskForm(<TaskForm time={dayStartTime} setNewTask={setNewTask} />);
        /* const newDayTasks = getTasks(dayStartTime, dayEndTime);
        setDayTasks(newDayTasks); */
        let posiitonOfCLick = e.clientY-dayRef.current.offsetTop;
        let clickedTime = posiitonOfCLick/60+7;
        console.log("clickedTime is: "+clickedTime);
        /* setTaskFormFormat( <TaskForm time={dayStartTime} setNewTask={setNewTaskHandler}/> );  */
        /* setShowTaskForm(true); */
        
    }

    function mouseOverHandler(e){
        
        const boundingDayRect = e.target.getBoundingClientRect();
        console.log("-----------------------------------");
       /*  if(e.target.className === "time-ruler-text" ) { 
            let mouseYPosOnDay = e.target.parentElement.clientY - boundingDayRect.top;
            console.log(e.target.parentElement.style.top);
        } */
        let mrLet = e.clientY-dayRef.current.offsetTop;
        console.log("hourindex is : ",e.target);
        /* if (e.target.offsetTop < mrLet+50) {e.target.style={color: "black"}}; */
        setChangeRulerHourStyle({opacity: (mrLet-e.clientY)/0.1/1000 }) ;
        console.log(changeRulerHourStyle)
    };

    const dayTitle = <div className="dayTitle" style={titleStyleChange}><h4 >{dayNumber}</h4><p >{"("+dayShortName+")"}</p></div>

    return (
        <>
        
        <div    className="day" 
                ref={dayRef}
                onClick={clickHandler}/* onPointerDown={pointerDownHandler} onPointerUp={pointerUpHandler} */ 
                onMouseOver={mouseOverHandler} >
            <TimeRuler hoursToDisplay={hoursToDisplay} timesStyle={changeRulerHourStyle}/>
            {dayTitle}
            {dayTasks.map( item => <Task key={item.key} taskData = {item}/>  ) }
        </div>
        
        {showTaskForm && {taskFormFormat}}
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