import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { getDefaultData, isShortTask } from "./helpers.js";

function Task({
	taskProps = getDefaultData(),
	onTaskClick,
	onDragStartHandler,
	onDragEndHandler,
	sizeDragStartHandler,
	sizeDragEndHandler,
	sizeDragHandler,
}) {
	const theDate = useMemo(() => new Date(taskProps.startDate), [onDragStartHandler]);
	const endDate = useMemo(() => new Date(taskProps.endDate), [onDragStartHandler]);

	const { isOverlapping } = taskProps;

	// This creates startDate format
	const taskTime = (() => {
		if (taskProps.startDate === "") {
			return "no startDate";
		}
		return `${theDate.getHours()}:${theDate.getMinutes().toString().padStart(2, "0")}`;
	})();
	const taskEndTime = (() => {
		if (taskProps.endDate === "") {
			return "no endDate";
		}
		return `${endDate.getHours()}:${endDate.getMinutes().toString().padStart(2, "0")}`;
	})();
	const taskBoxStart = (() => {
		if (taskProps.startDate === "") {
			return 0;
		} else {
			return (theDate.getHours() - 6) * 60 + theDate.getMinutes() + "px";
		}
	})();

	const taskBoxEnd = (() => {
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
			onDragEnd={(e) => onDragEndHandler(e)}
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
					visibility: isShortTask(theDate, endDate) ? "hidden" : "visible",
				}}>
				{`${taskTime} ${taskEndTime}`}
			</p>
			<p className='task-discription' style={taskTooSmallToP()}>
				{taskProps.description}
			</p>
			{isOverlapping && (
				<div className='task-overlap-notice'>
					<span className='overlap-tooltip'>Times overlap</span>
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
						borderLeft: isShortTask(theDate, endDate) ? `3px ${taskProps.color} solid` : "none",
					}}>
					&#x225A; . . .
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
