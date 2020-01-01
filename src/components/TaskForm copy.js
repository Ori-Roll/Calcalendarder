import React, {useState} from "react";

function TaskForm ({ time, setForm }){

    const [taskTitle, setTaskTitle] = useState("");
    const [taskTime, setTaskTime] = useState(time);
    const [taskDescription, setTaskDescription] = useState("");
    const [taskColor, setTaskColor] = useState("#0000FF");

    function inputChangeHandler(e, stateSetter){
        stateSetter(e.target.value);
    }

    function onSubmit () {
        setForm({
            title: taskTitle,
            time: taskTime,
        });
    }

    return (
            <form className = "task-form">
                <input
                    type="text-area" 
                    id="task-title" 
                    name="title" 
                    placeholder="What's your task?" 
                    classNam ="task-form-title" 
                    value = {taskTitle} 
                    onChange = {() => {inputChangeHandler(e, setTaskTitle)}}
                />

                <input
                    type="text-area" 
                    id="task-discription" 
                    name="discription" 
                    placeholder="Task discription?" 
                    className="task-form-discription"
                    value={taskDescription}
                    onChange={() => {inputChangeHandler(e, setTaskDescription)}}
                />

                <input
                    type="time"
                    id="task-time" 
                    name="task-time" 
                    value={taskTime}
                    onChange={() => {inputChangeHandler(e, setTaskTime)}}
                    className="task-form-time">  
                </input>
                
                <label
                    type="label"
                    htmlFor="form-color">
                        Color:
                </label>

                <input
                    type="color" 
                    id="task-form-color" 
                    name="form-color" 
                    value={taskColor} 
                    onChange={colorChangeHandler} 
                    className="task-form-color">
                </input>
                
                <button type = "submit" className = "task-form-submit">
                    <h1>&#10004;</h1>
                </button>
                
                <button type = "cancel" className = "task-form-cancel">
                    <h1>&#120299;</h1>
                </button>
            </form>
    );
};

export default TaskForm;