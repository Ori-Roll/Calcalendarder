import React, { useState, useContext } from "react";
import { AppContext } from "../appContext.js";
import Day from "./Day.js";

function Week() {
	const [weekDefocus, setWeekDefocus] = useState(false);

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
			{weekDays.map((date, index) => (
				<Day dayDate={date} key={date} setWeekDefocus={setWeekDefocus} />
			))}
		</div>
	);
}

export default Week;
