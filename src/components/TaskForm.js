import React from "react";

function TaskForm(props){

    return (
        <form className="task-form">
            <input type="text-area" id="task-title" name="" placeholder="What's your task?" className="task-form-title"></input>
            <input type="text-area" id="task-discription" name="" placeholder="Task discription?" className="task-form-discription"></input>
            <input type="time" id="task-time" name="" placeholder="" className="task-form-time"></input>
            <input type="color" id="task-form-color" name="task-form-color" value="#ff0000" ></input>
            <button type="submit" className="task-form-submit">V</button>
            <button type="cancel" className="task-form-cancel">X</button>
        </form>
    );
};

export default TaskForm;