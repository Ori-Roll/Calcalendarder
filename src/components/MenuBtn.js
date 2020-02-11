import React from "react";

function MenuBtn() {
	function menuBtnHandler() {
		console.log("menuBtnClick!");
	}

	return (
		<button className='menu-btn' onClick={menuBtnHandler}>
			&#x2630;
		</button>
	);
}

export default MenuBtn;
