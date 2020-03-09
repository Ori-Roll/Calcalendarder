import React, { useContext } from "react";
import { AppContext } from "../appContext.js";
import Calendar from "react-calendar/dist/entry.nostyle";

function SideBar() {
	const { setFocusDate } = useContext(AppContext);

	function clickDayHandler(value) {
		setFocusDate(value);
	}

	return (
		<div className='side-bar'>
			<Calendar
				tileClassName={"side-cal-item"}
				onChange={clickDayHandler}
				calendarType={"Hebrew"}
			/>
		</div>
	);
}

export default SideBar;
