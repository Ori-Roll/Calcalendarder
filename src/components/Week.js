import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../appContext.js";
import Day from "./Day.js";

function Week() {
	console.log("WEEK INIT");
	const [weekDefocus, setWeekDefocus] = useState(false);
	const [weekLog, setWeekLog] = useState([]);
	/* const [forceWeekRefresh, setForceWeekRefresh] = useState(false); */

	const { focusDate } = useContext(AppContext);

	function getWeekFirstDay(date) {
		return new Date(date.setDate(date.getDate() - date.getDay()));
	}

	const firstDayOfWeek = getWeekFirstDay(focusDate);
	const firstDayOfWeekDate = firstDayOfWeek.getDate();

	const weekDays = new Array(7)
		.fill(undefined)
		.map((item, i) => new Date(new Date(firstDayOfWeek).setDate(firstDayOfWeekDate + i)));

	return (
		<div className='week'>
			{weekDefocus && <div className='week-defocus' />}
			{weekDays.map(date => (
				<Day dayDate={date} key={date} setWeekDefocus={setWeekDefocus} setWeekLog={setWeekLog} />
			))}
		</div>
	);
}

export default Week;
