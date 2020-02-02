import React from 'react';

const defaultData = {id: 0, time: "" , endDate: "" , title: "empty t", description: "empty d", color: "gray"}; 

function Task({taskData = defaultData, onTaskClick, ...props}) {

    let theDate = new Date(taskData.time); 
    let endDate = new Date(taskData.endDate);

    // This creates time format
    let taskTime = ( ()=> { 
        if (taskData.time === "") {return "no time"};    
        return ( theDate.getHours() + ":" + theDate.getMinutes().toString().padStart(2 , "0") ) 
        } )();
    
    let taskBoxStart = ( () => {
            if (taskData.time === "") {
                return 0;
            } else {
                return ( ((( theDate.getHours() - 6) * 60)  + theDate.getMinutes() ) + "px"  );
            }
        }
    )();

    let taskBoxEnd = ( ()=> {
            if (taskData.endDate === "") {
                return "60px";
            } else {
                return ( 
                    ( ( ( (endDate.getHours() - 6) *60) + endDate.getMinutes() ) -
                    ( ( (theDate.getHours() - 6) * 60)  + theDate.getMinutes() ) ).toString() +"px"
                );
            }
        }
    )();

    const taskClickHandler = (e) => {
        e.stopPropagation();
        onTaskClick();
    }

    return (
        <div className="task" style={{height: taskBoxEnd, top: taskBoxStart}} onClick={taskClickHandler}>
            <p className="taskTitle" style={{color: taskData.color, borderLeftColor: taskData.color}}>
                {taskData.title}
            </p>
            <p className="task-time" style={{color: taskData.color, borderLeftColor: taskData.color}}>
                {taskTime}
            </p>
            <p className="task-description" style={ Number(taskBoxEnd.replace('px', '')) < 45 ? {opacity: "0%"} : {} }>
                {taskData.description}
            </p>
        </div>
    ); 
};

export default Task;



/* ( (theDate.getHours() -6) * 6) + ( theDate.getMinutes() ).toString().padStart(2 , "0") + "px" */