import React from "react";

function TaskForm(props){

    return (
        <form className="task-form">
            <input type="text" id="task-title" name="" placeholder="What's your task?" className="task-form-title"></input>
            <input type="text" id="task-discription" name="" placeholder="Task discription?" className="task-form-discription"></input>
            <input type="time" id="task-time" name="" placeholder="" className="task-form-time"></input>
            <button type="submit" className="task-form-submit">V</button>
            <button type="cancel" className="task-form-cancel">X</button>
        </form>
    );
};

export default TaskForm;