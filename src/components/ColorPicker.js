import React from "react";
import { pickerColors as colors } from "./helpers.js";

function ColorPicker({ setTaskColor, toggleColorPicker }) {
	function colorClickHandler(color) {
		setTaskColor(color);
		toggleColorPicker();
	}

	return (
		<div className='color-picker'>
			{colors.map(item => {
				return (
					<div
						key={item}
						className='color-select-btn'
						style={{ backgroundColor: item }}
						onClick={() => colorClickHandler(item)}
					/>
				);
			})}
		</div>
	);
}

export default ColorPicker;
