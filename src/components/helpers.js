const def = {
	tLength: 1,
	dayStartHour: 7
};

function getTaskTimeFromEvent(onDayRef, event) {
	let timeNumValue = (event.clientY - onDayRef.current.offsetTop - (def.dayStartHour - 1)) / 60 + 6;
	let fixedHour = timeNumValue > 7 ? Math.floor(timeNumValue) : 0;
	let fixedMin = timeNumValue > 7 ? Math.floor((timeNumValue - Math.floor(timeNumValue)) * 60) : 0;
	return { hours: fixedHour, minutes: fixedMin };
}

export { getTaskTimeFromEvent, def };
