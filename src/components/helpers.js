const def = {
	tLength: 1, // shitty name. what is t?! tromboneLength? tyrannosaurusLength?
	dayStartHour: 7,
	startDate: new Date().setHours(10),
	endDate: new Date().setHours(11),
	title: "",
	description: "",
	color: "gray",
	key: undefined // just so the structure will be clear
};

function getDefaultData() {
	let defaultData = Object.assign({}, def);
	defaultData.key = new Date().getTime();
	return defaultData;
}

function getTaskTimeFromEvent(onDayRef, event) {
	let timeNumValue = (event.clientY - onDayRef.current.offsetTop - (def.dayStartHour - 1)) / 60 + 6;
	let fixedHour = timeNumValue > 7 ? Math.floor(timeNumValue) : 0;
	let fixedMin = timeNumValue > 7 ? Math.floor((timeNumValue - Math.floor(timeNumValue)) * 60) : 0;
	return { hours: fixedHour, minutes: fixedMin };
}

export { getTaskTimeFromEvent, def, getDefaultData };
