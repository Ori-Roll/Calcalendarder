import React, {useState, useContext} from "react";
import {AppContext} from '../appContext.js';
import Calendar from "react-calendar";


function SideBar(props) {

    const [theDate, setTheDate] = useState(new Date(2019, 11, 20));

    let {currentDate, setCurrentDate} = useContext(AppContext);

    /* function onChane(date => setTmp(date)); */

    function onChange(date) {
        setTheDate({ date })
    };

    function clickDayHandler(value) {
        setCurrentDate(value)
        console.log("currentDate is now : ",currentDate)
    };

    return (
        <div className = "side-bar"> AAAAAAAAAAAAAAA 
            <Calendar
                /* onChange={onChange} */
                value={theDate}
                tileClassName = {"side-cal-item"}
                /* onClickDay = {clickDayHandler} */
                onChange = {clickDayHandler}
                calendarType = {"Hebrew"}
            />
        </div>
    );
};

export default SideBar;