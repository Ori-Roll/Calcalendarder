import React from "react";
import PropTypes from "prop-types";
import { getDefaultData } from "./helpers.js";

function Task({ taskProps = getDefaultData(), onTaskClick, onDragStartHandler }) {
	let theDate = new Date(taskProps.startDate);
	let endDate = new Date(taskProps.endDate);

	// This creates startDate format
	let taskTime = (() => {
		if (taskProps.startDate === "") {
			return "no startDate";
		}
		return `${theDate.getHours()}:${theDate
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;
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

	const taskClickHandler = e => {
		e.stopPropagation();
		onTaskClick();
	};

	function taskTooSmallToP() {
		return Number(taskBoxEnd.replace("px", "")) < 45 ? { opacity: "0%" } : {};
	}

	return (
		<div
			className='task'
			style={{ height: taskBoxEnd, top: taskBoxStart }}
			onClick={taskClickHandler}
			onDragStart={e => onDragStartHandler(e, taskProps)}
			draggable='true'>
			<p
				className='task-title'
				style={{ color: taskProps.color, borderLeftColor: taskProps.color }}>
				{taskProps.title}
			</p>
			<p className='task-time' style={{ color: taskProps.color, borderLeftColor: taskProps.color }}>
				{taskTime}
			</p>
			<p className='task-description' style={taskTooSmallToP()}>
				{taskProps.description}
			</p>
		</div>
	);
}

Task.prototypes = {
	taskProps: PropTypes.object,
	onTaskClick: PropTypes.func,
	onDragStartHandler: PropTypes.func
};

export default Task;
