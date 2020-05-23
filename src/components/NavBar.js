import React, { useContext } from "react";
import { AppContext } from "../appContext.js";
import { getTodayDate } from "./helpers";
/* import trashImg from "../images/Trash.jpg"; */

function NavBar() {
	const { setFocusDate } = useContext(AppContext);

	return (
		<header className='nav-bar'>
			<h1>calcalendarder</h1>
			<div
				className='today-btn'
				onClick={() => {
					setFocusDate(getTodayDate());
				}}>
				TODAY
			</div>
		</header>
	);
}

export default NavBar;
