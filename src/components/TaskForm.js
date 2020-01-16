import React, {useState, useRef, useEffect} from "react";
import ColorPicker from "./ColorPicker";

function TaskForm ({ time, setNewTask }){

    const [taskTime, setTaskTime] = useState(time);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskColor, setTaskColor] = useState("#91A79E");
    const [colorPickerIsOn, setColorPickerIsOn] = useState(false);

    const taskTitleRef = useRef();

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
    
    function toggleColorPicker(){
        setColorPickerIsOn(!colorPickerIsOn);
    };

    useEffect(
        ()=>{
            taskTitleRef.current.focus();
        }
        ,[]
    );

    return (
            <form className = "task-form" style={{borderColor: taskColor}}>
                <textarea
                    type="text-area" 
                    id="task-title" 
                    name="title" 
                    placeholder="What's your task?" 
                    className ="task-form-title" 
                    style = {{borderColor:taskColor}}
                    value = {taskTitle} 
                    onChange = {(e) => {inputChangeHandler(e, setTaskTitle)}}
                    ref = {taskTitleRef}
                />

                <textarea
                    type="text-area" 
                    id="task-discription" 
                    name="discription" 
                    placeholder="Task discription?" 
                    className="task-form-discription"
                    style = {{borderColor:taskColor}}
                    value={taskDescription}
                    onChange={(e) => {inputChangeHandler(e, setTaskDescription)}}
                />

                <input
                    type="time"
                    id="task-time" 
                    name="task-time" 
                    className="task-form-time"
                    style = {{borderColor:taskColor}}
                    value={taskTime}
                    onChange={(e) => {inputChangeHandler(e, setTaskTime)}}
                    >  
                </input>
                
                {/* <label
                    type="label"
                    htmlFor="form-color">
                        Task Color:
                </label> */}

                {/* <input
                    type="color" 
                    id="task-form-color" 
                    name="form-color" 
                    value={taskColor} 
                    onChange={(e) => {inputChangeHandler(e, setTaskColor)}} 
                    className="task-form-color">
                </input> */}
                
                <div 
                    onClick={toggleColorPicker}
                    className="task-form-color"
                    name="form-color"
                    style={{backgroundColor:taskColor}}
                    >
                        COLOR
                </div>

                <button 
                    type="submit" 
                    className="task-form-submit"
                    onClick={submitHandler}
                    >
                    &#10004;
                </button>
                
                <button type="button" 
                        className="task-form-cancel">
                    &#x2716;
                </button>
                
                { colorPickerIsOn===true ? <ColorPicker setTaskColor={setTaskColor} toggleColorPicker={toggleColorPicker}/> : <div/> }
            </form>
    );
};

export default TaskForm;