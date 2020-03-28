import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../appContext.js";
import Task from "./Task.js";
import TaskForm from "./TaskForm.js";
import { getTaskTimeFromEvent, defaultTask, todaysHeadStyle, dayHeadOffset } from "./helpers.js";

let dateToSet = new Date();

const getDateWithoutTime = date => [date.getDate(), date.getMonth(), date.getFullYear()].join(" ");
const isSameDate = (date1, date2) => getDateWithoutTime(date1) === getDateWithoutTime(date2);
const daysShortNames = Object.freeze(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]);
let bottomDragged = false;
let bottomDragStartPos = 0;

function Day({ dayDate, setWeekDefocus }) {
	const dayNumber = dayDate.getDate().toString();
	const dayShortName = daysShortNames[dayDate.getDay()];
	const dayStartTime = dayDate.getTime();
	const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999);

	const [showTaskForm, setShowTaskForm] = useState(false);
	const [newTaskTime, setNewTaskTime] = useState(new Date(dayDate));
	const [dayTasks, setDayTasks] = useState([]);
	const [forceResetTasks, setForceResetTasks] = useState(false);

	const [initialTask, setInitialTask] = useState({});
	const [initTaskIsNew, setInitTaskIsNew] = useState(true);

	const [timeToolTipIsOn, setTimeToolTopIsOn] = useState(false);
	const [timeToolTipPosition, setTimeToolTipPosition] = useState({
		x: 0,
		y: 50
	});
	const [startDaggingSizeAmount, setStartDaggingSizeAmount] = useState(0);

	const { taskData, setNewTask, currentDate, removeTaskWithKey, setCurrentDate } = useContext(
		AppContext
	);

	const dayRef = useRef();

	const titleStyleChange = isSameDate(dayDate, currentDate) ? todaysHeadStyle : {};

	useEffect(() => {
		setCurrentDate(new Date());
	}, []);

	useEffect(() => {
		setDayTasks(getTasks(dayStartTime, dayEndTime));
		/* console.log("USE EFFECT");
		console.log(taskData); */
		setForceResetTasks(false);
	}, [taskData.length, forceResetTasks]);

	function getTasks(startDate, endTime) {
		/* console.log("getTasks");
		console.log("start" + new Date(startDate) + ",  end " + new Date(endTime));
		console.log("taskData : ", taskData); */
		let taskSet = taskData.filter(item => {
			return item.startDate >= startDate && item.startDate < endTime;
		});
		/* console.log("TaskSet", taskSet); */
		return taskSet;
	}

	function clickHandler(e) {
		setInitTaskIsNew(true);
		const newStartDate = new Date(dayDate);
		const newEndDate = new Date(dateToSet);

		newStartDate.setHours(dateToSet.getHours());
		newStartDate.setMinutes(dateToSet.getMinutes());
		newEndDate.setHours(dateToSet.getHours() + defaultTask.timeLength);

		const emptyNewTask = {
			key: new Date().getTime().toString(),
			startDate: newStartDate,
			endDate: newEndDate,
			title: "",
			description: ""
		};

		/* setNewTask(emptyNewTask); */
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

	function submitHandler(e, formTask, originalTask) {
		/* isNew ? console.log("I is New") : console.log("I is OLD"); */

		e.preventDefault();
		setNewTask({ ...formTask });
		/* console.log("taskForm", { ...formTask }); */
		/* setInitialTask(() => {
			return {
				key: Math.random() * 10,
				startDate: formTask.taskStartTime,
				endDate: formTask.taskEndTime,
				title: formTask.taskTitle,
				description: formTask.taskDescription,
				color: formTask.taskColor
			};
		}); */
		/* removeTaskWithKey(originalTask.key); */
		// REMOVE SET TASKS IN CONTEXT WITH "..." in setState on both the task and the array !!!
		/* console.log("originalTask", originalTask); */
		setWeekDefocus(false);
		setShowTaskForm(false);
		/* console.log(dayTasks); */
	}

	function mouseMoveHandler(e) {
		const taskTimeFromEvent = getTaskTimeFromEvent(dayRef, e);
		dateToSet.setHours(taskTimeFromEvent.hours);
		dateToSet.setMinutes(taskTimeFromEvent.minutes);
		setTimeToolTipPosition({ y: e.clientY - dayHeadOffset });
		setNewTaskTime(dateToSet);
	}

	function onDragStartHandler(e, taskProps) {
		/* console.log("onDragStartHandler" + e.clientY); */
		if (bottomDragged !== true) {
			const taskIndex = dayTasks.findIndex(item => item.key === taskProps.key);
			dayTasks.splice(taskIndex, 1);
			e.dataTransfer.setData("taskKey", taskProps.key);
		}
	}

	function onDragOverHandler(e) {
		e.preventDefault();
	}

	function onDropHandler(e) {
		/* console.log("onDropHandler , e: ", e.dataTransfer.getData("taskKey")); */
		if (bottomDragged !== true) {
			e.preventDefault();
			const dropedTaskKey = e.dataTransfer.getData("taskKey");
			/* console.log(taskData); */
			const dropedTaskIndex = taskData.findIndex(item => {
				return item.key.toString() === dropedTaskKey;
			});
			const dropedTask = taskData[dropedTaskIndex];

			const taskHoursTimeDifference =
				dropedTask.endDate.getHours() - dropedTask.startDate.getHours();
			const taskMinutesTimeDifferance =
				dropedTask.endDate.getMinutes() - dropedTask.startDate.getMinutes();

			dropedTask.startDate.setTime(dayDate.getTime());
			dropedTask.startDate.setHours(getTaskTimeFromEvent(dayRef, e).hours);
			dropedTask.startDate.setMinutes(getTaskTimeFromEvent(dayRef, e).minutes);

			dropedTask.endDate.setTime(dayDate.getTime());
			dropedTask.endDate.setHours(dropedTask.startDate.getHours() + taskHoursTimeDifference);
			dropedTask.endDate.setMinutes(dropedTask.startDate.getMinutes() + taskMinutesTimeDifferance);
			setForceResetTasks(true);
			/* setDayTasks(getTasks(dayStartTime, dayEndTime)); */
		}
	}

	function sizeDragStartHandler(e, taskKey) {
		/* console.log("sizeDragStartHandler");*/
		bottomDragged = true;
		bottomDragStartPos = e.clientY;
		console.log("Start", e.clientY);
		/* let resizedTask =
			taskData[
				taskData.findIndex(item => {
					return item.key === taskKey;
				})
			];
		resizedTask.endDate.setTime(resizedTask.endDate.getTime() + 100000);
		setStartDaggingSizeAmount(0); */
	}

	function sizeDragHandler(e, taskKey) {
		let resizedTask =
			taskData[
				taskData.findIndex(item => {
					return item.key === taskKey;
				})
			];
		/* console.log(e.clientY); */

		/* console.log(e.currentTarget.parentElement.getBoundingClientRect().top); */
		/* resizedTask.endDate.setTime(
			resizedTask.endDate.getTime() +
				(e.clientY - e.currentTarget.parentElement.getBoundingClientRect().top - 50) * 1000
		); */

		setStartDaggingSizeAmount(0);
	}

	function sizeDragEndHandler(e, taskKey) {
		console.log("--------------------");
		let resizedTask =
			taskData[
				taskData.findIndex(item => {
					return item.key === taskKey;
				})
			];
		resizedTask.endDate.setTime(
			resizedTask.endDate.getTime() + (e.clientY - bottomDragStartPos) * 60000
		);
		/* console.log("start was", bottomDragStartPos);
		console.log("end", e.clientY); */
		console.log(e.clientY - bottomDragStartPos);
		/* (e.clientY - e.currentTarget.parentElement.getBoundingClientRect().top)  */
		/* resizedTask.endDate.setTime(resizedTask.endDate.getTime() + 1000000); */
		bottomDragged = false;
		/* console.log("THIS!!!!" + e.clientY);
		let endDate = taskData[taskKey].endDate;
		console.log("THIS!" + endDate.setTime(endDate + e.clientY));
		setStartDaggingSizeAmount(0); */
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
						key={item.key}
						taskProps={item}
						onTaskClick={() => taskClickHandler(item)}
						onDragStartHandler={onDragStartHandler}
						sizeDragStartHandler={sizeDragStartHandler}
						sizeDragHandler={sizeDragHandler}
						sizeDragEndHandler={sizeDragEndHandler}
					/>
				))}
				{timeToolTipIsOn && (
					<div className='time-tool-tip' style={{ top: timeToolTipPosition.y }}>
						{`${newTaskTime.getHours()}:${newTaskTime
							.getMinutes()
							.toString()
							.padStart(2, "0")}`}
					</div>
				)}
			</div>
			{showTaskForm && (
				<TaskForm
					initialTask={initialTask}
					submitHandler={submitHandler}
					isNew={initTaskIsNew}
					setWeekDefocus={setWeekDefocus}
					setShowTaskForm={setShowTaskForm}
					removeTaskWithKey={removeTaskWithKey}
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
