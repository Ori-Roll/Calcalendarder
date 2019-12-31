import React from "react";

function TaskForm(props){

    return (
        <form className="task-form">
            <input type="time" id="task-time" name="" placeholder=""></input>
            <input type="text" id="task-title" name="" placeholder="What's your task?"></input>
            <input type="text" id="task-discription" name="" placeholder="Task discription?"></input>
        </form>
    );
};

export default TaskForm;