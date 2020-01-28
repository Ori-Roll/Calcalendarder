import React from 'react';

const defaultData = {id: 0, time: "" , endDate: "" , title: "empty t", description: "empty d", color: "gray"}; 

function Task(props) {

    let data;
    props.taskData ? data = props.taskData : data = defaultData;
    let theDate = new Date(data.time); 
    let endDate = new Date(data.endDate)

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
                return ( ((( theDate.getHours() - 6) * 60)  + theDate.getMinutes() ) + "px"  );
            }
        }
    )();

    let taskBoxEnd = ( ()=> {
            if (data.endDate === "") {
                return "60px";
            } else {
                return ( 
                    ( ( ( (endDate.getHours() - 6) *60) + endDate.getMinutes() ) -
                    ( ( (theDate.getHours() - 6) * 60)  + theDate.getMinutes() ) ).toString() +"px"
                );
            }
        }
    )();
        
        /* console.log("taskStart is "+theDate+",  taskEnd is "+endDate);
        console.log("taskBoxStart is "+taskBoxStart+",  taskBoxEnd is "+taskBoxEnd); */
        console.log("taskBoxEnd.replace('px', '') : "+ taskBoxEnd.replace('px', ''));

    return (
        <div className="task" style={{height: taskBoxEnd, top: taskBoxStart}}>
            <p className="taskTitle" style={{color: data.color, borderLeftColor: data.color}}>
                {data.title}
            </p>
            <p className="task-time">{taskTime}</p>
            <p className="task-description" style={ Number(taskBoxEnd.replace('px', '')) < 45 ? {opacity: "0%"} : {} }>{data.description}</p>
        </div>
    ); 
};

export default Task;



/* ( (theDate.getHours() -6) * 6) + ( theDate.getMinutes() ).toString().padStart(2 , "0") + "px" */