import React from 'react';

const defaultData = {key: (Math.random()*100), time: "" , endDate: "" , title: "empty t", description: "empty d", color: "gray"}; 

function Task({taskProps = defaultData, onTaskClick, onDragStartHandler, onDragOverHandler, /* taskMouseDownHandler, */ ...props}) {

    let theDate = new Date(taskProps.time); 
    let endDate = new Date(taskProps.endDate);

    // This creates time format
    let taskTime = ( ()=> { 
        if (taskProps.time === "") {return "no time"};    
        return ( theDate.getHours() + ":" + theDate.getMinutes().toString().padStart(2 , "0") ) 
        } )();
    
    let taskBoxStart = ( () => {
            if (taskProps.time === "") {
                return 0;
            } else {
                return ( ((( theDate.getHours() - 6) * 60)  + theDate.getMinutes() ) + "px"  );
            }
        }
    )();

    let taskBoxEnd = ( ()=> {
            if (taskProps.endDate === "") {
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
        <div className="task" 
                style={{ height: taskBoxEnd, top: taskBoxStart}} 
                onClick={taskClickHandler} 
                /* onMouseDown={(e) => taskMouseDownHandler(taskProps.key, e)} */
                onDragStart={(e) => onDragStartHandler(e, taskProps)}
                /* onDragOverHandler={(e) => onDragOverHandler(e)} */
                draggable={"true"}
            >
            <p className="taskTitle" style={{color: taskProps.color, borderLeftColor: taskProps.color}}>
                {taskProps.title}
            </p>
            <p className="task-time" style={{color: taskProps.color, borderLeftColor: taskProps.color}}>
                {taskTime}
            </p>
            <p className="task-description" style={ Number(taskBoxEnd.replace('px', '')) < 45 ? {opacity: "0%"} : {} }>
                {taskProps.description}
            </p>
        </div>
    ); 
};

export default Task;



/* ( (theDate.getHours() -6) * 6) + ( theDate.getMinutes() ).toString().padStart(2 , "0") + "px" */