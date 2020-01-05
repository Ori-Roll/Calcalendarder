import React, {useState} from "react";

function TaskForm ({ time, setNewTask }){

    const [taskTime, setTaskTime] = useState(time);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskColor, setTaskColor] = useState("#0000FF");

    function getRandomString() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }

    function inputChangeHandler(e, stateSetter){
        stateSetter(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        setNewTask({
            key: getRandomString(),
            time: taskTime,
            title: taskTitle,
            description: taskDescription,
            color: taskColor
        });
        console.log("Form says: new task is: "+taskTime+taskTitle+taskDescription+taskColor);
    }
    
    return (
            <form className = "task-form">
                <input
                    type="text-area" 
                    id="task-title" 
                    name="title" 
                    placeholder="What's your task?" 
                    className ="task-form-title" 
                    value = {taskTitle} 
                    onChange = {(e) => {inputChangeHandler(e, setTaskTitle)}}
                />

                <input
                    type="text-area" 
                    id="task-discription" 
                    name="discription" 
                    placeholder="Task discription?" 
                    className="task-form-discription"
                    value={taskDescription}
                    onChange={(e) => {inputChangeHandler(e, setTaskDescription)}}
                />

                <input
                    type="time"
                    id="task-time" 
                    name="task-time" 
                    value={taskTime}
                    onChange={(e) => {inputChangeHandler(e, setTaskTime)}}
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
                    onChange={(e) => {inputChangeHandler(e, setTaskColor)}} 
                    className="task-form-color">
                </input>
                
                <button 
                    type="submit" 
                    className="task-form-submit"
                    onClick={submitHandler}
                    >
                    &#10004;
                </button>
                
                <button type="button" className="task-form-cancel">
                    &#x2716;
                </button>
                
                <div className="color-picker">
                            Select a color
                            <button type="button" className="color-select-btn" style={{backgroundColor: "green"}} ></button> 
                            {/* <input type="radio" name="green" checked={false} className="color-radio-btn" style="backgroundColor: green"></input> */}
                </div>
            </form>
    );
};

export default TaskForm;