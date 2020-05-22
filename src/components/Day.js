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

let bottomDragged = false;
let bottomDragStartPos = 0;
let bottomDragStartOfTaskSet = 0;
let resizedTask;

function Day({ dayDate, setWeekDefocus }) {
	const dayNumber = dayDate.getDate().toString();
	const dayShortName = daysShortNames[dayDate.getDay()];
	const dayStartTime = dayDate.getTime();
	const dayEndTime = new Date(dayDate).setHours(23, 59, 59, 999);

	const [showTaskForm, setShowTaskForm] = useState(false);
	const [newTaskTime, setNewTaskTime] = useState(new Date(dayDate));
	const [dayTasks, setDayTasks] = useState([]);
	/* const [forceResetTasks, setForceResetTasks] = useState(false); */

	const [initialTask, setInitialTask] = useState({});
	const [initTaskIsNew, setInitTaskIsNew] = useState(true);

	const [timeToolTipIsOn, setTimeToolTopIsOn] = useState(false);
	const [timeToolTipPosition, setTimeToolTipPosition] = useState({
		x: 0,
		y: 50,
	});

	const [noDragTimer, setNoDragTimer] = useState(false);

	const {
		taskData,
		setNewTask,
		currentDate,
		removeTaskWithKey,
		setCurrentDate,
		replaceTasks,
	} = useContext(AppContext);

	const dayRef = useRef();

	const titleStyleChange = isSameDate(dayDate, currentDate) ? todaysHeadStyle : {};

	useEffect(() => {
		setCurrentDate(new Date());
	}, []);

	useEffect(() => {
		setDayTasks(getTasks(dayStartTime, dayEndTime));
	}, [taskData]);

	useEffect(() => {
		setTimeout(() => {
			setNoDragTimer(false);
		}, 100);
	}, [noDragTimer]);

	setTimeout(
		() =>
			dayTasks.forEach((item) => {
				if (isOverlapping(item, dayTasks)) {
					item.isOverlapping = true;
				} else {
					item.isOverlapping = false;
				}
			}),
		0
	);

	function getTasks(startDate, endTime) {
		let taskSet = taskData.filter((item) => {
			return item.startDate >= startDate && item.startDate < endTime;
		});
		return taskSet;
	}

	function clickHandler(e) {
		setInitTaskIsNew(true);
		const newStartDate = new Date(dayDate);
		const newEndDate = new Date(dayDate);

		newStartDate.setHours(dateToSet.getHours());
		newStartDate.setMinutes(dateToSet.getMinutes());
		newEndDate.setHours(dateToSet.getHours() + defaultTask.timeLength);
		newEndDate.setMinutes(newStartDate.getMinutes());

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
		if (bottomDragged !== true) {
			const taskIndex = dayTasks.findIndex((item) => item.key === taskProps.key);
			dayTasks.splice(taskIndex, 1);
			const clickToTaskStartDif = e.clientY - e.target.getBoundingClientRect().y;
			e.dataTransfer.setData("taskKey", taskProps.key);
			e.dataTransfer.setData("clickToTaskStartDif", clickToTaskStartDif);
		}
	}

	function onDragOverHandler(e) {
		e.preventDefault();
	}

	function onDropHandler(e) {
		if (bottomDragged !== true) {
			e.preventDefault();
			const dropedTaskIndex = taskData.findIndex((item) => {
				return item.key.toString() === e.dataTransfer.getData("taskKey");
			});
			const dropedTask = taskData[dropedTaskIndex];
			const newTask = { ...dropedTask };
			const taskHoursTimeDifference = newTask.endDate.getHours() - newTask.startDate.getHours();
			const taskMinutesTimeDifferance =
				newTask.endDate.getMinutes() - newTask.startDate.getMinutes();

			const clickToTaskStartDif = e.dataTransfer.getData("clickToTaskStartDif");

			newTask.startDate.setTime(dayDate.getTime());
			newTask.startDate.setHours(getTaskTimeFromEvent(dayRef, e, clickToTaskStartDif).hours);
			newTask.startDate.setMinutes(getTaskTimeFromEvent(dayRef, e, clickToTaskStartDif).minutes);
			newTask.startDate = roundDateToFive(newTask.startDate);

			newTask.endDate.setTime(dayDate.getTime());
			newTask.endDate.setHours(newTask.startDate.getHours() + taskHoursTimeDifference);
			newTask.endDate.setMinutes(newTask.startDate.getMinutes() + taskMinutesTimeDifferance);
			newTask.endDate = roundDateToFive(newTask.endDate);
			replaceTasks(dropedTask.key, newTask);
		}
	}
	function onDragEndHandler(e) {
		if (e.dataTransfer.dropEffect === "none") {
			setDayTasks(getTasks(dayStartTime, dayEndTime));
		}
	}

	/* function skipDragFuncByMin(func, e, minInterval) {
		func();
	} */

	function sizeDragStartHandler(e, taskKey) {
		bottomDragged = true;
		bottomDragStartPos = e.clientY;
		resizedTask =
			taskData[
				taskData.findIndex((item) => {
					return item.key === taskKey;
				})
			];
		bottomDragStartOfTaskSet = resizedTask.endDate.getTime();
	}

	function sizeDragHandler(e, taskKey) {
		let newPos = bottomDragStartOfTaskSet + (e.clientY - bottomDragStartPos) * timePixelsToMin;
		let taskSizeNotNegative = resizedTask.endDate.getTime() > resizedTask.startDate.getTime();
		if (taskSizeNotNegative) {
			if (!noDragTimer && taskSizeNotNegative) {
				resizedTask.endDate.setTime(newPos);
				/* setForceResetTasks(true); */
				setNoDragTimer(true);
			}
		}

		/* skipDragFuncByMin(doSizeDrag, e, 5); */
	}

	function sizeDragEndHandler(e, taskKey) {
		let dragDiffrance = e.clientY - bottomDragStartPos;
		const dragTo = bottomDragStartOfTaskSet + dragDiffrance * 60000;
		let taskSizeNotNegative = resizedTask.endDate.getTime() > resizedTask.startDate.getTime();
		resizedTask.endDate.setTime(roundDateToFive(new Date(dragTo)));
		if (!taskSizeNotNegative) {
			resizedTask.endDate.setTime(resizedTask.startDate.getTime() + minTaskLength * 3 * 60000);
		}
		bottomDragged = false;
		/* setForceResetTasks(false); */
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
