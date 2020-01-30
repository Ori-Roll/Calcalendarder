import React, {useState, useRef, useEffect} from "react";
import ColorPicker from "./ColorPicker";

function TaskForm ({ time, setNewTask, setWeekDefocus}){
    
    const [taskTime, setTaskTime] = useState(time);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskColor, setTaskColor] = useState("#91A79E");
    const [colorPickerIsOn, setColorPickerIsOn] = useState(false);

    const startDate = new Date(taskTime);

    const taskTitleRef = useRef();

    function getRandomString() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }

    function inputChangeHandler(e, stateSetter){
        stateSetter(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        const endDateToSet = new Date(taskTime);
        endDateToSet.setHours(endDateToSet.getHours()+2)
        setNewTask({
            key: getRandomString(),
            time: taskTime,
            endDate: endDateToSet,
            title: taskTitle,
            description: taskDescription,
            color: taskColor
        });
        setWeekDefocus(false);
        console.log("Form says: new task is: " + taskTime + ', ' + taskTitle + ', ' + taskDescription + ', ' + taskColor);
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
                    style = {{borderColor: taskColor}}
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

                <label
                    type="label"
                    htmlFor="task-time"
                    className="task-form-time-lable"
                    style={{color: taskColor}}
                    >
                    Starts at:
                </label>

                <input
                    type="time"
                    id="task-time" 
                    name="task-time" 
                    className="task-form-time"
                    style = {{borderColor:taskColor}}
                    min = "07:00"
                    max = "21:00"
                    value = {startDate.getHours().toString().padStart(2 , 0) + ":"+startDate.getMinutes().toString().padStart(2 , 0)}
                    onChange={(e) => {inputChangeHandler(e, setTaskTime)}}
                    >  
                </input>
                
                <label
                    type="label"
                    htmlFor="task-time-end"
                    className="task-form-end-lable"
                    style={{color: taskColor}}
                    >
                    Ends at:
                </label>

                <input
                    type="time"
                    id="task-time-end" 
                    name="task-time-end" 
                    className="task-form-time-end"
                    style = {{borderColor:taskColor}}
                    min = "07:00"
                    max = "21:00"
                    value = "08:00"
                    /* onChange={(e) => {inputChangeHandler(e, setTaskTime)}} */
                    >  
                </input>
                
                <div 
                    onClick={toggleColorPicker}
                    className="task-form-color"
                    name="form-color"
                    style={{backgroundColor:taskColor}}
                    >
                        	C
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
                