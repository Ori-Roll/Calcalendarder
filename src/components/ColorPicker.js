import React from "react";

function ColorPicker({ setTaskColor, toggleColorPicker }) {
	function colorClickHandler(color) {
		setTaskColor(color);
		toggleColorPicker();
	}

	const colors = [
		"#2C3D4F",
		"#91A79E",
		"#F1E5C8",
		"#EDB19F",
		"#C87660",
		"#D1AAA7",
		"#C6A7D1",
		"#A7D1C1",
		"#BCD1A7",
		"#615855",
		"#555B61",
		"#5FC6C7",
		"#CEA296",
		"#B87A76",
		"#C75F7A",
		"#C7B65F",
		"#7682B8",
		"#977E9E",
		"#7E859E",
		"#A0CE96",
		"#4B4F2C",
		"#703957",
		"#472C4F",
		"#2C334F",
		"#A9A875",
		"rgb(184, 22, 57)",
		"rgb(184, 114, 22)",
		"rgb(218, 208, 70)",
		"gray",
		"white"
	];

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
