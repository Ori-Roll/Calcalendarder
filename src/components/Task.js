import React from 'react';

const defaultData = {id : 0, time : "" , title: "empty t", detail: "empty d"}; 

function Task(props) {

    let data;

    props.taskData ? data = props.taskData : data = defaultData;
    
    // This creates time format
    let taskTime = ( ()=> { 
        if (data.time === "") {return "no time"};
        let theDate = new Date(data.time); 
        return ( theDate.getHours() + ":" + theDate.getMinutes().toString().padStart(2 , "0") ) 
        } )();

    return (
        <div className="task">
            <h5 className="taskTitle">{data.title}</h5>
            <p className="taskTime">{taskTime}</p>
            <p>
                {data.detail}
            </p>
        </div>
    ); 
};

export default Task;