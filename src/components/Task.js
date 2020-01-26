import React from 'react';

const defaultData = {id: 0, time: "" , endDate: "" , title: "empty t", description: "empty d", color: "gray"}; 

function Task(props) {

    let data;
    props.taskData ? data = props.taskData : data = defaultData;
    let theDate = new Date(data.time); 

    // This creates time format
    let taskTime = ( ()=> { 
        if (data.time === "") {return "no time"};    
        return ( theDate.getHours() + ":" + theDate.getMinutes().toString().padStart(2 , "0") ) 
        } )();
    
    let taskBoxStart = ( () => {
            if (data.time === "") {
                return 0;
            } else {
                console.log ( theDate.getHours());
                console.log ( theDate.getMinutes());
                return ( ((( theDate.getHours() - 6) * 6) + theDate.getMinutes().toString() ) + "px"  );
            }
        }
    )();

    let taskBoxEnd = ( ()=> {
            if (data.endDate === "") {
                return "60px";
            } else {
                return ( ( (data.endDate.getHours()-6) * 6) + ( data.endDate.getMinutes() ).toString+"px" );
            }
        }
    )();
    
        console.log("taskBoxStart is "+taskBoxStart+",  taskBoxEnd is "+taskBoxEnd);

    return (
        <div className="task" style={{height: /* taskBoxEnd-taskBoxStart */"60px", top: taskBoxStart}}>
            <p className="taskTitle" style={{color: data.color, borderLeftColor: data.color}}>
                {data.title}
            </p>
            <p className="task-time">{taskTime}</p>
            <p className="task-description">{data.description}</p>
        </div>
    ); 
};

export default Task;