import React, { useContext } from "react";
import { AppContext } from "../appContext.js";
import MenuBtn from "./MenuBtn.js";

function NavBar() {
	const { setFocusDate } = useContext(AppContext);

	return (
		<header className='nav-bar'>
			<h1>calcalendarder</h1>
			<div
				className='today-btn'
				onClick={() => {
					const dateToSet = new Date();
					dateToSet.setHours(0);
					dateToSet.setMinutes(0);
					setFocusDate(dateToSet);
				}}>
				&#x273F; TODAY
			</div>
		</header>
	);
}

export default NavBar;
