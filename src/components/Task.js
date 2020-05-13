import React from "react";
import PropTypes from "prop-types";
import { getDefaultData, isShortTask } from "./helpers.js";

function Task({
	taskProps = getDefaultData(),
	onTaskClick,
	onDragStartHandler,
	sizeDragStartHandler,
	sizeDragEndHandler,
	sizeDragHandler,
}) {
	/* console.log("task!!!", taskProps); */
	let theDate = new Date(taskProps.startDate);
	let endDate = new Date(taskProps.endDate);

	const { isOverlapping } = taskProps;

	// This creates startDate format
	let taskTime = (() => {
		if (taskProps.startDate === "") {
			return "no startDate";
		}
		return `${theDate.getHours()}:${theDate.getMinutes().toString().padStart(2, "0")}`;
	})();
	let taskEndTime = (() => {
		if (taskProps.endDate === "") {
			return "no endDate";
		}
		return `${endDate.getHours()}:${endDate.getMinutes().toString().padStart(2, "0")}`;
	})();
	let taskBoxStart = (() => {
		if (taskProps.startDate === "") {
			return 0;
		} else {
			return (theDate.getHours() - 6) * 60 + theDate.getMinutes() + "px";
		}
	})();

	let taskBoxEnd = (() => {
		if (taskProps.endDate === "") {
			return "60px";
		} else {
			return (
				(
					(endDate.getHours() - 6) * 60 +
					endDate.getMinutes() -
					((theDate.getHours() - 6) * 60 + theDate.getMinutes())
				).toString() + "px"
			);
		}
	})();

	const taskClickHandler = (e) => {
		e.stopPropagation();
		onTaskClick();
	};

	function taskTooSmallToP() {
		return Number(taskBoxEnd.replace("px", "")) < 45 ? { opacity: "0%" } : {};
	}

	return (
		<div
			className='task'
			style={{
				height: taskBoxEnd,
				top: taskBoxStart,
				width: isOverlapping ? "95%" : "100%",
				right: isOverlapping ? "0" : null,
			}}
			onClick={taskClickHandler}
			onDragStart={(e) => onDragStartHandler(e, taskProps)}
			draggable='true'>
			<p
				className='task-title'
				style={{
					color: taskProps.color,
					borderLeftColor: taskProps.color,
					visibility: isShortTask(theDate, endDate) ? "hidden" : "visible",
				}}>
				{taskProps.title}
			</p>
			<p
				className='task-time'
				style={{
					color: taskProps.color,
					borderLeftColor: taskProps.color,
					/* visibility: isShortTask(theDate, endDate) ? "hidden" : "visible", */
				}}>
				{`${taskTime} ${taskEndTime}`}
			</p>
			<p className='task-discription' style={taskTooSmallToP()}>
				{taskProps.description}
			</p>
			{isOverlapping && (
				<div className='task-overlap-notice'>
					<span className='overlap-tooltip'>Entries are overlapping</span>
					&#x2731;
				</div>
			)}
			<div
				className='task-size-handle'
				style={{ borderColor: taskProps.color }}
				draggable='true'
				onDragStart={(e) => sizeDragStartHandler(e, taskProps.key)}
				onDrag={(e) => sizeDragHandler(e, taskProps.key)}
				onDragEnd={(e) => sizeDragEndHandler(e, taskProps.key)}>
				<p
					className='short-task-indicator'
					style={{
						color: taskProps.color,
						visibility: isShortTask(theDate, endDate) ? "visible" : "hidden",
					}}>
					&#x279C; . . .
				</p>
			</div>
		</div>
	);
}

Task.prototypes = {
	taskProps: PropTypes.object,
	onTaskClick: PropTypes.func,
	onDragStartHandler: PropTypes.func,
};

export default Task;
