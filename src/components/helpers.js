import React from "react";
const defaultTask = {
	timeLength: 1,
	dayStartHour: 7,
	startDate: new Date().setHours(10),
	endDate: new Date().setHours(11),
	title: "",
	description: "",
	color: "gray",
};

function getInitTasks() {
	const tasks = [
		{
			key: "introTask",
			startDate: new Date(),
			endDate: new Date(),
			title: "Hi there!",
			description: `Click to change.\nOr click and drag somewhere or drag the bottom line to change time.`,
			color: "#b81639",
		},
	];
	tasks[0].startDate.setHours(12);
	tasks[0].startDate.setMinutes(0);
	tasks[0].endDate.setHours(13);
	tasks[0].endDate.setMinutes(30);

	return tasks;
}

function getTodayDate() {
	const todayDate = new Date();
	todayDate.setHours(0);
	todayDate.setMinutes(0);
	return todayDate;
}

function getDefaultData() {
	let defaultData = Object.assign({}, defaultTask);
	defaultData.key = new Date().getTime();
	return defaultData;
}

function getTaskTimeFromEvent(onDayRef, event, clickToTaskStartDif) {
	let timeNumValue =
		(event.clientY - onDayRef.current.offsetTop - defaultTask.dayStartHour - 6) / 60 + 6;
	if (clickToTaskStartDif) {
		timeNumValue -= clickToTaskStartDif / 60;
	}
	let fixedHour = timeNumValue > 7 ? Math.floor(timeNumValue) : 0;
	let fixedMin = timeNumValue > 7 ? Math.floor((timeNumValue - Math.floor(timeNumValue)) * 60) : 0;
	return { hours: fixedHour, minutes: fixedMin };
}

function dateifyTaskTime(newTime, originalDate) {
	const newDate = new Date(originalDate.getTime());
	newDate.setHours(newTime.slice(0, 2), newTime.slice(3, 5));
	return newDate;
}

function roundUpToFive(num) {
	for (let i = 5; i > 0; i--) {
		num = Number.isInteger(num / 5) ? num : num + 1;
	}
}

function roundDateToFive(date) {
	let minValue = date.getMinutes();
	for (let i = 10; i > 0; i--) {
		minValue = Number.isInteger(minValue / 10) ? minValue : minValue + 1;
	}
	let newDate = new Date(date.getTime());
	newDate.setMinutes(minValue);
	return newDate;
}

function isOverlapping(task, tasksList) {
	return tasksList.some((item) => {
		return (
			task.startDate.getTime() > item.startDate.getTime() &&
			task.startDate.getTime() <
				item.endDate.getTime() /* ||
			(task.startDate.getTime() === item.startDate.getTime() &&
				task.endDate.getTime() === item.endDate.getTime()) */
		);
	});
}

const isShortTask = (startDate, endDate) => {
	if (
		endDate.getHours() - startDate.getHours() < 1 &&
		endDate.getMinutes() - startDate.getMinutes() < 26
	) {
		return true;
	} else {
		return false;
	}
};

const pickerColors = [
	"#2C3D4F",
	"#91A79E",
	"#F1E5C8",
	"#EDB19F",
	"#C87660",
	"#D1AAA7",
	"#C6A7D1",
	"#A7D1C1",
	"#BCD1A7",
	"#615855",
	"#555B61",
	"#5FC6C7",
	"#CEA296",
	"#B87A76",
	"#C75F7A",
	"#C7B65F",
	"#7682B8",
	"#977E9E",
	"#7E859E",
	"#A0CE96",
	"#4B4F2C",
	"#703957",
	"#472C4F",
	"#2C334F",
	"#A9A875",
	"#b81639",
	"#b87216",
	"#dad046",
	"gray",
	"white",
];

const todaysHeadStyle = { color: "#f1e5c8", backgroundColor: "#4f6f8e" };

const defaultTaskColor = "#2769a3";

const dayHeadOffset = 65;

const timePixelsToMin = 60000;

const minTaskLength = 10;

const hoursBeforeDayStart = [0, 1, 2, 3, 4, 5, 6];

const hoursAfterDayEnd = [20, 21, 22, 23];

export {
	getTaskTimeFromEvent,
	getInitTasks,
	getTodayDate,
	defaultTask,
	getDefaultData,
	pickerColors,
	todaysHeadStyle,
	defaultTaskColor,
	dayHeadOffset,
	timePixelsToMin,
	dateifyTaskTime,
	roundUpToFive,
	roundDateToFive,
	isOverlapping,
	minTaskLength,
	hoursBeforeDayStart,
	hoursAfterDayEnd,
	isShortTask,
};
