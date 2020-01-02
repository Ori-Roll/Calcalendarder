import React, {useEffect, useState} from "react";

function TaskForm ({ time, setNewTask }){

    const [taskColor, setTaskColor] = useState("#0000FF");

    const [taskInfo, setTaskInfo] = useState({ key: getRandomString(), time, title: "NEWWWWW", description: "", color: "#60808c" });

    /* {key: "2", time: new Date('2019-12-30T01:00:00').getTime(), title: "Today 2  2 2 2 2 2", description: "stuff 2 do" }, */

    function getRandomString() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }

    function inputChangeHandler(e){
        console.log("task info is:", taskInfo);
        console.log ("e =", e)
        const name = e.target.name;
        const value = e.target.value;
        
        console.log("!!!!!!  "+ taskInfo.title)
        setTaskInfo(
            (prevData) => {
                return {...prevData, 
                        [name]: value
                };
            }
        )
        
    };

    function colorChangeHandler(e) {
        setTaskColor(e.target.value);
        
        console.log("handle THIS COLOR!!!"+taskColor);
    };

    function submitHandler () {
        setNewTask(taskInfo)
    };

    return (
            <form className = "task-form">
                <input  type = "text-area" 
                        id = "task-title" 
                        name = "title" 
                        placeholder = "What's your task?" 
                        className = "task-form-title" 
                        value = {taskInfo.title} 
                        onChange = {inputChangeHandler}>
                </input>
                
                <input  type = "text-area" 
                        id = "task-discription" 
                        name = "discription" 
                        placeholder = "Task discription?" 
                        className = "task-form-discription">
                </input>
                
                <input  type = "time"
                        id = "task-time" 
                        name = "task-time" 
                        value = "12:00" 
                        onChange = {console.log("time, ... what is... time")}
                        className = "task-form-time">  
                </input>
                
                <label  type = "label"
                        htmlFor = "form-color">Color:</label>

                <input  type = "color" 
                        id = "task-form-color" 
                        name = "form-color" 
                        value = {taskColor} 
                        onChange = {colorChangeHandler} 
                        className = "task-form-color">
                </input>
                
                <button 
                    type = "submit" 
                    className = "task-form-submit"
                    onClick = {submitHandler}
                    >
                    <h1>&#10004;</h1>
                </button>
                
                <button type = "cancel" className = "task-form-cancel">
                    <h1>&#120299;</h1>
                </button>
            </form>
    );
};

export default TaskForm;