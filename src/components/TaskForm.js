import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ColorPicker from "./ColorPicker";
import {
	defaultTaskColor,
	roundDateToFive,
	minTaskLength,
	hoursBeforeDayStart,
	hoursAfterDayEnd,
} from "./helpers.js";
import colorPickerImg from "../images/colorPicker.png";
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
	const [startTimeDisplay, setStartTimeDisplay] = useState("08:00");
	const [endTimeDisplay, setEndTimeDisplay] = useState("10:00");

	const [taskTitle, setTaskTitle] = useState(initialTask.title);
	const [taskDescription, setTaskDescription] = useState(initialTask.description);
	const [taskColor, setTaskColor] = useState(isNew ? defaultTaskColor : initialTask.color);
	const [colorPickerIsOn, setColorPickerIsOn] = useState(false);

	const startDate = new Date(taskStartTime);

	const taskTitleRef = useRef();

	function inputChangeHandler(e, stateSetter) {
		stateSetter(e.target.value);
	}

	function timeChangeHandler(stateSetter, momentObj) {
		stateSetter(new Date(momentObj.valueOf()));
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

	function hoursAfterEndTime() {
		const badHours = [...hoursBeforeDayStart];
		for (let i = 23; i > 0; i--) {
			if (taskEndTime.getHours() < i) {
				badHours.push(i);
			} else {
				break;
			}
		}
		return badHours;
	}

	function minAfterEndTime(h) {
		if (h === taskEndTime.getHours()) {
			const badMins = [];
			for (let i = 59; i > 0; i--) {
				if (taskEndTime.getMinutes() - minTaskLength <= i + 1) {
					badMins.push(i);
				} else {
					break;
				}
			}
			return badMins;
		}
	}

	function hoursBeforeStartTime() {
		const badHours = [...hoursAfterDayEnd];
		for (let i = 0; i < 23; i++) {
			if (taskStartTime.getHours() + 1 > i + 1) {
				badHours.push(i);
			} else {
				break;
			}
		}
		return badHours;
	}

	function minsBeforeStartTime(h) {
		if (h === taskStartTime.getHours()) {
			const badMins = [];
			for (let i = 0; i < 59; i++) {
				if (taskStartTime.getMinutes() + minTaskLength >= i + 1) {
					badMins.push(i);
				} else {
					break;
				}
			}
			return badMins;
		}
	}

	useEffect(() => {
		taskTitleRef.current.focus();
		function setTimeDisplay(setDisplayFunc, sourceDate) {
			setDisplayFunc(
				sourceDate.getHours().toString().padStart(2, 0) +
					":" +
					sourceDate.getMinutes().toString().padStart(2, 0)
			);
		}
		setTimeDisplay(setStartTimeDisplay, startDate);
		setTimeDisplay(setEndTimeDisplay, taskEndTime);

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
				disabledHours={() => hoursAfterEndTime()}
				disabledMinutes={(h) => minAfterEndTime(h)}
				onChange={(momentObj) => timeChangeHandler(setTaskStartTime, momentObj)}
			/>
			{/* <input
				type='time'
				id='task-time'
				name='task-time'
				className='task-form-time'
				style={{ color: taskColor }}
				min='07:00'
				max='21:00'
				autoComplete='true'
				value={startTimeDisplay}
				step={300}
				onChange={(e) => {
					inputChangeHandler(e, setStartTimeDisplay);
				}}></input> */}

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
				disabledHours={() => hoursBeforeStartTime()}
				disabledMinutes={(h) => minsBeforeStartTime(h)}
				hideDisabledOptions={true}
				onChange={(momentObj) => timeChangeHandler(setTaskEndTime, momentObj)}
			/>
			{/* <input
				type='time'
				id='task-time-end'
				name='task-time-end'
				className='task-form-time-end'
				style={{ color: taskColor }}
				min='07:00'
				max='21:00'
				value={endTimeDisplay}
				onChange={(e) => {
					inputChangeHandler(e, setEndTimeDisplay);
				}}></input> */}

			<div
				onClick={toggleColorPicker}
				className='task-form-color'
				name='form-color'
				style={{ backgroundColor: taskColor }}>
				<img src={colorPickerImg} />
			</div>

			{/* <button className='task-form-delete'
			onClick={}>&#128465;</button> */}

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

			{colorPickerIsOn && (
				<ColorPicker setTaskColor={setTaskColor} toggleColorPicker={toggleColorPicker} />
			)}
			<div style={{ backgroundColor: taskColor }} className='task-form-bottom-color'></div>
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
