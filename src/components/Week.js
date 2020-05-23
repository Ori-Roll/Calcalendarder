import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../appContext.js";
import Day from "./Day.js";

function Week() {
	const [weekDefocus, setWeekDefocus] = useState(false);

	const { focusDate, setCurrentDate } = useContext(AppContext);

	function getWeekFirstDay(date) {
		return new Date(date.setDate(date.getDate() - date.getDay()));
	}

	function formBackClickHandler() {}

	const firstDayOfWeek = getWeekFirstDay(focusDate);
	const firstDayOfWeekDate = firstDayOfWeek.getDate();

	const weekDays = new Array(7)
		.fill(undefined)
		.map((item, i) => new Date(new Date(firstDayOfWeek).setDate(firstDayOfWeekDate + i)));

	/* useEffect(() => {
		setCurrentDate(new Date());
	}, []); */

	return (
		<div className='week'>
			{weekDefocus && <div className='week-defocus' onClick={formBackClickHandler} />}
			{weekDays.map((date) => (
				<Day dayDate={date} key={date} setWeekDefocus={setWeekDefocus} />
			))}
		</div>
	);
}

export default Week;
