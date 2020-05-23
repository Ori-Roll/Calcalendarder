import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ColorPicker from "./ColorPicker";
import {
	defaultTaskColor,
	roundDateToFive,
	minsBeforeStartTime,
	hoursBeforeStartTime,
	minAfterEndTime,
	hoursAfterEndTime,
} from "./helpers.js";
import colorPickerImg from "../images/colorPicker.png";
import trashImg from "../images/Trash.jpg";
import TimePicker from "rc-time-picker";
import moment from "moment";
import "rc-time-picker/assets/index.css";

function TaskForm({
	setWeekDefocus,
	isNew,
	initialTask,
	setShowTaskForm,
	removeTaskWithKey,
	submitHandler,
}) {
	const [taskStartTime, setTaskStartTime] = useState(initialTask.startDate);
	const [taskEndTime, setTaskEndTime] = useState(initialTask.endDate);

	const [taskTitle, setTaskTitle] = useState(initialTask.title);
	const [taskDescription, setTaskDescription] = useState(initialTask.description);
	const [taskColor, setTaskColor] = useState(isNew ? defaultTaskColor : initialTask.color);
	const [colorPickerIsOn, setColorPickerIsOn] = useState(false);

	const taskTitleRef = useRef();

	function inputChangeHandler(e, stateSetter) {
		stateSetter(e.target.value);
	}

	function timeChangeHandler(stateSetter, momentObj) {
		stateSetter(new Date(momentObj.valueOf()));
	}

	function cancelClickHandler() {
		if (isNew) {
			removeTaskWithKey(initialTask.key);
		}
		setWeekDefocus(false);
		setShowTaskForm(false);
	}

	function toggleColorPicker() {
		setColorPickerIsOn(!colorPickerIsOn);
	}

	function deleteThisTask() {
		removeTaskWithKey(initialTask.key);
		setShowTaskForm(false);
		setWeekDefocus(false);
	}

	useEffect(() => {
		taskTitleRef.current.focus();
		setTaskStartTime(roundDateToFive(taskStartTime));
		setTaskEndTime(roundDateToFive(taskEndTime));
	}, []);

	return (
		<form className='task-form' style={{ borderColor: taskColor }}>
			<textarea
				type='text-area'
				id='task-title'
				name='title'
				placeholder="What's your task?"
				className='task-form-title'
				style={{ borderColor: taskColor }}
				value={taskTitle}
				onChange={(e) => {
					inputChangeHandler(e, setTaskTitle);
				}}
				ref={taskTitleRef}
			/>

			<textarea
				type='text-area'
				id='task-discription'
				name='discription'
				placeholder='Task discription?'
				className='task-form-discription'
				style={{ borderColor: taskColor }}
				value={taskDescription}
				onChange={(e) => {
					inputChangeHandler(e, setTaskDescription);
				}}
			/>

			<label
				type='label'
				htmlFor='task-form-time'
				className='task-form-time-lable'
				style={{ color: taskColor }}>
				Starts at:
			</label>

			<TimePicker
				className='task-form-time'
				defaultValue={moment(taskStartTime)}
				showSecond={false}
				clearIcon={false}
				allowEmpty={false}
				popupClassName={"popup"}
				minuteStep={5}
				hideDisabledOptions={true}
				disabledHours={() => hoursAfterEndTime(taskEndTime)}
				disabledMinutes={(h) => minAfterEndTime(h, taskEndTime)}
				onChange={(momentObj) => timeChangeHandler(setTaskStartTime, momentObj)}
			/>

			<label
				type='label'
				htmlFor='task-form-time-end'
				className='task-form-end-lable'
				style={{ color: taskColor }}>
				Ends at:
			</label>

			<TimePicker
				className='task-form-time-end'
				defaultValue={moment(taskEndTime)}
				showSecond={false}
				clearIcon={false}
				allowEmpty={false}
				popupClassName={"popup"}
				minuteStep={5}
				disabledHours={() => hoursBeforeStartTime(taskStartTime)}
				disabledMinutes={(h) => minsBeforeStartTime(h, taskStartTime)}
				hideDisabledOptions={true}
				onChange={(momentObj) => timeChangeHandler(setTaskEndTime, momentObj)}
			/>

			<div
				onClick={toggleColorPicker}
				className='task-form-color'
				name='form-color'
				style={{ backgroundColor: taskColor }}>
				<img src={colorPickerImg} alt='COLOR' />
			</div>

			<button
				type='submit'
				className='task-form-submit'
				onClick={(e) =>
					submitHandler(
						e,
						{
							key: new Date().getTime(),
							startDate: taskStartTime,
							endDate: taskEndTime,
							title: taskTitle,
							description: taskDescription,
							color: taskColor,
						},
						isNew,
						initialTask.key
					)
				}>
				&#10004;
			</button>

			<button type='button' className='task-form-cancel' onClick={cancelClickHandler}>
				&#x2716;
			</button>
			<img src={trashImg} alt='DELETE' className='task-form-delete' onClick={deleteThisTask}></img>

			{colorPickerIsOn && (
				<ColorPicker setTaskColor={setTaskColor} toggleColorPicker={toggleColorPicker} />
			)}
			<div className='task-form-side-color' style={{ backgroundColor: taskColor }}></div>
		</form>
	);
}

TaskForm.prototypes = {
	setWeekDefocus: PropTypes.func,
	isNew: PropTypes.bool,
	initialTask: PropTypes.object,
	setShowTaskForm: PropTypes.func,
	removeTaskWithKey: PropTypes.func,
};

export default TaskForm;
