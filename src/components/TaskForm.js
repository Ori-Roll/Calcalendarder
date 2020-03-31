import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ColorPicker from "./ColorPicker";
import { defaultTaskColor } from "./helpers.js";

function TaskForm({
	setWeekDefocus,
	isNew,
	initialTask,
	setShowTaskForm,
	removeTaskWithKey,
	submitHandler
}) {
	const [taskStartTime, setTaskStartTime] = useState(initialTask.startDate);
	const [taskEndTime] = useState(initialTask.endDate);
	const [taskTitle, setTaskTitle] = useState(initialTask.title);
	const [taskDescription, setTaskDescription] = useState(initialTask.description);
	const [taskColor, setTaskColor] = useState(isNew ? defaultTaskColor : initialTask.color);
	const [colorPickerIsOn, setColorPickerIsOn] = useState(false);
	const [startTimeDisplay, setStartTimeDisplay] = useState("08:00");
	const [endTimeDisplay, setEndTimeDisplay] = useState("10:00");

	const startDate = new Date(taskStartTime);

	const taskTitleRef = useRef();

	console.log("FORM: ", initialTask);

	function inputChangeHandler(e, stateSetter) {
		stateSetter(e.target.value);
	}

	/* 	function submitHandler(e) {
		isNew ? console.log("I is New") : console.log("I is OLD");
		e.preventDefault();
		initialTask.startDate = taskStartTime;
		initialTask.endDate = taskEndTime;
		initialTask.title = taskTitle;
		initialTask.description = taskDescription;
		initialTask.color = taskColor;
		setWeekDefocus(false);
		setShowTaskForm(false);
	} */

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

		function setTimeDisplay(setDisplayFunc, sourceDate) {
			setDisplayFunc(
				sourceDate
					.getHours()
					.toString()
					.padStart(2, 0) +
					":" +
					sourceDate
						.getMinutes()
						.toString()
						.padStart(2, 0)
			);
		}
		setTimeDisplay(setStartTimeDisplay, startDate);
		setTimeDisplay(setEndTimeDisplay, taskEndTime);
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
				value={endTimeDisplay}
				readOnly={true}
				onChange={e => {
					/* inputChangeHandler(e, setTaskStartTime); */
				}}></input>

			<div
				onClick={toggleColorPicker}
				className='task-form-color'
				name='form-color'
				style={{ backgroundColor: taskColor }}>
				C
			</div>

			<button
				type='submit'
				className='task-form-submit'
				onClick={e =>
					submitHandler(
						e,
						{
							key: new Date().getTime(),
							startDate: taskStartTime,
							endDate: taskEndTime,
							title: taskTitle,
							description: taskDescription,
							color: taskColor
						},
						initialTask
					)
				}>
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
