import React, {useState, useContext} from "react";
import {AppContext} from '../appContext.js';
import Calendar from "react-calendar/dist/entry.nostyle";


function SideBar(props) {

    const [theDate, setTheDate] = useState(new Date());

    const {focusDate, setFocusDate} = useContext(AppContext);

    /* function onChane(date => setTmp(date)); */

    function onChange(date) {
        setTheDate({ date })
    };

    function clickDayHandler(value) {
        setFocusDate(value);
    };

    return (
        <div className = "side-bar"> 
            <Calendar
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