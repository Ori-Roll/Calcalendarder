import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../appContext.js";
import Task from "./Task.js";
import TaskForm from "./TaskForm.js";

let dateToSet = new Date();

const getDateWithoutTime = date => [date.getDate(), date.getMonth(), date.getFullYear()].join(" ");
const isSameDate = (date1, date2) => getDateWithoutTime(date1) === getDateWithoutTime(date2);

function Day({ dayDate, setWeekDefocus }) {
	const dayNumber = dayDate.getDate().toString();
	const dayShortName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][dayDate.getDay()];
	const dayStartTime = dayDate.getTime();
	const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999);

	const [showTaskForm, setShowTaskForm] = useState(false);
	const [newTaskTime, setNewTaskTime] = useState(new Date(dayDate));
	const [dayTasks, setDayTasks] = useState([]);

	const [initialTask, setInitialTask] = useState({});
	const [initTaskIsNew, setInitTaskIsNew] = useState(true);

	const [timeToolTopIsOn, setTimeToolTopIsOn] = useState(false);
	const [timeToolTipPosition, setTimeToolTipPosition] = useState({
		x: 0,
		y: 50
	});

	const { taskData, setTaskData, setNewTask, currentDate } = useContext(AppContext);

	const dayRef = useRef();

	const titleStyleChange = isSameDate(dayDate, currentDate)
		? { color: "#f1e5c8", backgroundColor: "#4f6f8e" }
		: {};

	/* function setNewTaskHandler(newTaskToSet) {
        setShowTaskForm(false);
        setNewTask(newTaskToSet);
    } */

	useEffect(() => {
		setDayTasks(getTasks(dayStartTime, dayEndTime));
	}, [taskData.length]);

	useEffect(() => {
		setDayTasks(getTasks(dayStartTime, dayEndTime));
	}, []);

	function getTasks(startDate, endTime) {
		let taskSet = taskData.filter(item => {
			return item.startDate >= startDate && item.startDate < endTime;
		});
		return taskSet;
	}

	function clickHandler(e) {
		setInitTaskIsNew(true);

		const newStartDate = new Date(dayDate);
		const newEndDate = new Date(dateToSet);

		newStartDate.setHours(dateToSet.getHours());
		newStartDate.setMinutes(dateToSet.getMinutes());
		newEndDate.setHours(dateToSet.getHours() + 2);
		/* setNewTaskTimeSet(newTime); */
		const emptyNewTask = {
			key: new Date().getTime().toString(),
			startDate: newStartDate,
			endDate: newEndDate,
			title: "",
			description: ""
		};

		setNewTask(emptyNewTask);
		setInitialTask(emptyNewTask);
		setShowTaskForm(true);
		setWeekDefocus(true);
	}

	function taskClickHandler(task) {
		setInitTaskIsNew(false);
		setInitialTask(task);
		setShowTaskForm(true);
		setWeekDefocus(true);
	}
	// -------------------------------TO MISC FUNCTIONALITY -----------------------------------------------
	function getTaskTimeFromEvent(onDayRef, event) {
		let timeNumValue = (event.clientY - onDayRef.current.offsetTop - 6) / 60 + 6;
		let fixedHour = timeNumValue > 7 ? Math.floor(timeNumValue) : 0;
		let fixedMin =
			timeNumValue > 7 ? Math.floor((timeNumValue - Math.floor(timeNumValue)) * 60) : 0;
		return { hours: fixedHour, minutes: fixedMin };
	}
	//-----------------------------------------------------------------------------------------------------
	function mouseMoveHandler(e) {
		dateToSet.setHours(getTaskTimeFromEvent(dayRef, e).hours);
		dateToSet.setMinutes(getTaskTimeFromEvent(dayRef, e).minutes);
		setTimeToolTipPosition({ y: e.clientY - 65 });
		setNewTaskTime(dateToSet);
	}

	function onDragStartHandler(e, taskProps) {
		console.log("onDragStartHandler" + e.clientY);
		const taskIndex = dayTasks.findIndex(item => item.key === taskProps.key);
		dayTasks.splice(taskIndex, 1);
		e.dataTransfer.setData("taskKey", taskProps.key);
		/* taskData[taskIndex].style */
	}

	function onDragOverHandler(e) {
		e.preventDefault();
	}

	function onDropHandler(e) {
		console.log("onDropHandler , e: ", e.dataTransfer.getData("taskKey"));
		e.preventDefault();
		const dropedTaskKey = e.dataTransfer.getData("taskKey");
		const dropedTaskIndex = taskData.findIndex(item => item.key === dropedTaskKey);
		const dropedTask = taskData[dropedTaskIndex];

		const taskHoursTimeDifference = dropedTask.endDate.getHours() - dropedTask.startDate.getHours();
		const taskMinutesTimeDifferance =
			dropedTask.endDate.getMinutes() - dropedTask.startDate.getMinutes();

		dropedTask.startDate.setTime(dayDate.getTime());
		dropedTask.startDate.setHours(getTaskTimeFromEvent(dayRef, e).hours);
		dropedTask.startDate.setMinutes(getTaskTimeFromEvent(dayRef, e).minutes);

		dropedTask.endDate.setTime(dayDate.getTime());
		dropedTask.endDate.setHours(dropedTask.startDate.getHours() + taskHoursTimeDifference);
		dropedTask.endDate.setMinutes(dropedTask.startDate.getMinutes() + taskMinutesTimeDifferance);

		setDayTasks(getTasks(dayStartTime, dayEndTime));
	}

	const dayTitle = (
		<div className='dayTitle' style={titleStyleChange}>
			<h4>{dayNumber}</h4>
			<p>{"(" + dayShortName + ")"}</p>
		</div>
	);

	return (
		<div className='day-container'>
			{dayTitle}
			<div
				className='day'
				ref={dayRef}
				onClick={clickHandler}
				onMouseMove={mouseMoveHandler}
				onMouseOver={() => {
					setTimeToolTopIsOn(true);
				}}
				onMouseLeave={() => {
					setTimeToolTopIsOn(false);
				}}
				onDragOver={onDragOverHandler}
				onDrop={onDropHandler}>
				{dayTasks.map(item => (
					<Task
						taskProps={item}
						onTaskClick={() => taskClickHandler(item)}
						onDragStartHandler={onDragStartHandler}
					/>
				))}
				{timeToolTopIsOn && (
					<div className='time-tool-tip' style={{ top: timeToolTipPosition.y }}>
						{newTaskTime.getHours() + ":" + newTaskTime.getMinutes()}
					</div>
				)}
			</div>
			{showTaskForm && (
				<TaskForm
					initialTask={initialTask}
					isNew={initTaskIsNew}
					setWeekDefocus={setWeekDefocus}
					setShowTaskForm={setShowTaskForm}
				/>
			)}
		</div>
	);
}

Day.prototypes = {
	setWeekDefocus: PropTypes.func,
	dayDate: PropTypes.object
};

export default Day;
