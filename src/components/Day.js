import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../appContext.js";
import Task from "./Task.js";
import TaskForm from "./TaskForm.js";
import {
	getTaskTimeFromEvent,
	defaultTask,
	todaysHeadStyle,
	dayHeadOffset,
	timePixelsToMin,
	isOverlapping,
	roundDateToFive,
	minTaskLength,
} from "./helpers.js";

let dateToSet = new Date();

const getDateWithoutTime = (date) =>
	[date.getDate(), date.getMonth(), date.getFullYear()].join(" ");
const isSameDate = (date1, date2) => getDateWithoutTime(date1) === getDateWithoutTime(date2);
const daysShortNames = Object.freeze(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]);

function Day({ dayDate, setWeekDefocus }) {
	const dayNumber = dayDate.getDate().toString();
	const dayShortName = daysShortNames[dayDate.getDay()];
	const dayStartTime = dayDate.getTime();
	const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999);

	const [showTaskForm, setShowTaskForm] = useState(false);
	const [newTaskTime, setNewTaskTime] = useState(new Date(dayDate));
	const [dayTasks, setDayTasks] = useState([]);

	const [initialTask, setInitialTask] = useState({});
	const [initTaskIsNew, setInitTaskIsNew] = useState(true);

	const [timeToolTipIsOn, setTimeToolTopIsOn] = useState(false);
	const [timeToolTipPosition, setTimeToolTipPosition] = useState({
		x: 0,
		y: 50,
	});

	const [noDragTimer, setNoDragTimer] = useState(false);

	const { taskData, setNewTask, currentDate, removeTaskWithKey, replaceTasks } = useContext(
		AppContext
	);

	const dayRef = useRef();

	const bottom = useRef({
		dragged: false,
		dragStartPos: 0,
		dragStartOfTaskSet: 0,
	});

	const resizedTask = useRef();

	const titleStyleChange = isSameDate(dayDate, currentDate) ? todaysHeadStyle : {};

	useEffect(() => {
		setDayTasks(getTasks(dayStartTime, dayEndTime));
	}, [taskData]);

	useEffect(() => {
		setNoDragTimer(false);
	}, [noDragTimer]);

	useEffect(() => {
		dayTasks.forEach((item) => {
			item.isOverlapping = isOverlapping(item, dayTasks);
		});
	});

	function getTasks(startDate, endDate) {
		let taskSet = taskData.filter((item) => {
			return item.startDate >= startDate && item.startDate < endDate;
		});
		return taskSet;
	}

	function clickHandler(e) {
		setInitTaskIsNew(true);
		const newStartDate = new Date(dayDate);
		const newEndDate = new Date(dayDate);

		newStartDate.setHours(dateToSet.getHours(), dateToSet.getMinutes());
		newEndDate.setHours(dateToSet.getHours() + defaultTask.timeLength, newStartDate.getMinutes());

		const emptyNewTask = {
			key: new Date().getTime().toString(),
			startDate: roundDateToFive(newStartDate),
			endDate: roundDateToFive(newEndDate),
			title: "",
			description: "",
		};

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

	function submitHandler(e, formTask, isNew, oldTaskKey) {
		e.preventDefault();
		if (isNew) {
			setNewTask({ ...formTask });
		} else {
			replaceTasks(oldTaskKey, formTask);
		}
		setWeekDefocus(false);
		setShowTaskForm(false);
	}

	function mouseMoveHandler(e) {
		const taskTimeFromEvent = getTaskTimeFromEvent(dayRef, e);
		dateToSet.setHours(taskTimeFromEvent.hours);
		dateToSet.setMinutes(taskTimeFromEvent.minutes);
		setTimeToolTipPosition({ y: e.clientY - dayHeadOffset });
		setNewTaskTime(dateToSet);
	}

	function onDragStartHandler(e, taskProps) {
		if (bottom.current.dragged !== true) {
			const taskIndex = dayTasks.findIndex((item) => item.key === taskProps.key);
			dayTasks.splice(taskIndex, 1);
			const clickToTaskStartDelta = e.clientY - e.target.getBoundingClientRect().y;
			e.dataTransfer.setData("taskKey", taskProps.key);
			e.dataTransfer.setData("clickToTaskStartDelta", clickToTaskStartDelta);
		}
	}

	function onDragOverHandler(e) {
		e.preventDefault();
	}

	function onDropHandler(e) {
		if (bottom.current.dragged !== true) {
			e.preventDefault();
			const dropedTask =
				taskData[
					taskData.findIndex((item) => {
						return item.key.toString() === e.dataTransfer.getData("taskKey");
					})
				];
			const newTask = { ...dropedTask };

			// task in new position needs to have the same length
			const taskHoursTimeDifference = newTask.endDate.getHours() - newTask.startDate.getHours();
			const taskMinutesTimeDifferance =
				newTask.endDate.getMinutes() - newTask.startDate.getMinutes();

			// position the task according to where it was clicked on the task at the start of the drag
			const clickToTaskStartDelta = e.dataTransfer.getData("clickToTaskStartDelta");

			newTask.startDate.setTime(dayDate.getTime());
			newTask.startDate.setHours(
				getTaskTimeFromEvent(dayRef, e, clickToTaskStartDelta).hours,
				getTaskTimeFromEvent(dayRef, e, clickToTaskStartDelta).minutes
			);
			newTask.startDate = roundDateToFive(newTask.startDate);

			newTask.endDate.setTime(dayDate.getTime());
			newTask.endDate.setHours(
				newTask.startDate.getHours() + taskHoursTimeDifference,
				newTask.startDate.getMinutes() + taskMinutesTimeDifferance
			);
			newTask.endDate = roundDateToFive(newTask.endDate);

			replaceTasks(dropedTask.key, newTask);
		}
	}
	function onDragEndHandler(e) {
		if (e.dataTransfer.dropEffect === "none") {
			setDayTasks(getTasks(dayStartTime, dayEndTime));
		}
	}

	function sizeDragStartHandler(e, taskKey) {
		bottom.current.dragged = true;
		bottom.current.dragStartPos = e.clientY;
		resizedTask.current =
			taskData[
				taskData.findIndex((item) => {
					return item.key === taskKey;
				})
			];
		bottom.current.dragStartOfTaskSet = resizedTask.current.endDate.getTime();
	}

	function sizeDragHandler(e, taskKey) {
		let newPos =
			bottom.current.dragStartOfTaskSet +
			(e.clientY - bottom.current.dragStartPos) * timePixelsToMin;
		let taskSizeNotNegative =
			resizedTask.current.endDate.getTime() > resizedTask.current.startDate.getTime();
		if (taskSizeNotNegative) {
			if (!noDragTimer && taskSizeNotNegative) {
				resizedTask.current.endDate.setTime(newPos);
				setNoDragTimer(true);
			}
		}
	}

	function sizeDragEndHandler(e) {
		let dragDiffrance = e.clientY - bottom.current.dragStartPos;
		const dragTo = bottom.current.dragStartOfTaskSet + dragDiffrance * 60000;
		let taskSizeNotNegative =
			resizedTask.current.endDate.getTime() > resizedTask.current.startDate.getTime();
		resizedTask.current.endDate.setTime(roundDateToFive(new Date(dragTo)));
		if (!taskSizeNotNegative) {
			resizedTask.current.endDate.setTime(
				resizedTask.current.startDate.getTime() + minTaskLength * 3 * 60000
			);
		}
		bottom.current.dragged = false;
	}

	function onDragLeaveHandler() {
		setTimeToolTopIsOn(false);
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
				{dayTasks.map((item) => (
					<Task
						key={item.key}
						taskProps={item}
						onTaskClick={() => taskClickHandler(item)}
						onDragStartHandler={onDragStartHandler}
						sizeDragStartHandler={sizeDragStartHandler}
						sizeDragHandler={sizeDragHandler}
						sizeDragEndHandler={sizeDragEndHandler}
						onDragEndHandler={onDragEndHandler}
						onDragLeaveHandler={onDragLeaveHandler}
					/>
				))}
				{timeToolTipIsOn && (
					<div className='time-tool-tip' style={{ top: timeToolTipPosition.y }}>
						{`${newTaskTime.getHours()}:${newTaskTime.getMinutes().toString().padStart(2, "0")}`}
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
	dayDate: PropTypes.object,
};

export default Day;
