import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ColorPicker from "./ColorPicker";
import { defaultTaskColor } from "./helpers.js";

function TaskForm({ setWeekDefocus, isNew, initialTask, setShowTaskForm, removeTaskWithKey }) {
	const [taskStartTime, setTaskStartTime] = useState(initialTask.startDate);
	const [taskEndTime] = useState(initialTask.endDate);
	const [taskTitle, setTaskTitle] = useState(initialTask.title);
	const [taskDescription, setTaskDescription] = useState(initialTask.description);
	const [taskColor, setTaskColor] = useState(isNew ? defaultTaskColor : initialTask.color);
	const [colorPickerIsOn, setColorPickerIsOn] = useState(false);
	const [startTimeDisplay, setStartTimeDisplay] = useState("08:00");

	const startDate = new Date(taskStartTime);

	const taskTitleRef = useRef();

	function inputChangeHandler(e, stateSetter) {
		stateSetter(e.target.value);
	}

	function submitHandler(e) {
		e.preventDefault();
		if (isNew) {
			initialTask.startDate = taskStartTime;
			initialTask.endDate = taskEndTime;
			initialTask.title = taskTitle;
			initialTask.description = taskDescription;
			initialTask.color = taskColor;
			console.log("isNew+");
		} else {
			initialTask.startDate = taskStartTime;
			initialTask.endDate = taskEndTime;
			initialTask.title = taskTitle;
			initialTask.description = taskDescription;
			initialTask.color = taskColor;
			console.log("isOLD");
		}
		setWeekDefocus(false);
		setShowTaskForm(false);
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

	useEffect(() => {
		taskTitleRef.current.focus();

		setStartTimeDisplay(
			startDate
				.getHours()
				.toString()
				.padStart(2, 0) +
				":" +
				startDate
					.getMinutes()
					.toString()
					.padStart(2, 0)
		);
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
				onChange={e => {
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
				onChange={e => {
					inputChangeHandler(e, setTaskDescription);
				}}
			/>

			<label
				type='label'
				htmlFor='task-time'
				className='task-form-time-lable'
				style={{ color: taskColor }}>
				Starts at:
			</label>

			<input
				type='time'
				id='task-time'
				name='task-time'
				className='task-form-time'
				style={{ borderColor: taskColor }}
				min='07:00'
				max='21:00'
				autoComplete='true'
				value={startTimeDisplay}
				onChange={e => {
					inputChangeHandler(e, setTaskStartTime);
				}}></input>

			<label
				type='label'
				htmlFor='task-time-end'
				className='task-form-end-lable'
				style={{ color: taskColor }}>
				Ends at:
			</label>

			<input
				type='time'
				id='task-time-end'
				name='task-time-end'
				className='task-form-time-end'
				style={{ borderColor: taskColor }}
				min='07:00'
				max='21:00'
				value='08:00'
				onChange={e => {
					inputChangeHandler(e, setTaskStartTime);
				}}></input>

			<div
				onClick={toggleColorPicker}
				className='task-form-color'
				name='form-color'
				style={{ backgroundColor: taskColor }}>
				C
			</div>

			<button type='submit' className='task-form-submit' onClick={submitHandler}>
				&#10004;
			</button>

			<button type='button' className='task-form-cancel' onClick={cancelClickHandler}>
				&#x2716;
			</button>

			{colorPickerIsOn === true ? (
				<ColorPicker setTaskColor={setTaskColor} toggleColorPicker={toggleColorPicker} />
			) : (
				<div />
			)}
		</form>
	);
}

TaskForm.prototypes = {
	setWeekDefocus: PropTypes.func,
	isNew: PropTypes.bool,
	initialTask: PropTypes.object,
	setShowTaskForm: PropTypes.func,
	removeTaskWithKey: PropTypes.func
};

export default TaskForm;
