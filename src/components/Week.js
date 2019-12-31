import React, {useContext } from 'react';
import Day from './Day.js';

import {AppContext} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';

function Week (props) {

    const {currentDate} = useContext(AppContext);
    const weeksDays = [currentDate.getDay() ]

    return (       
            <div className="week">
                <Day dayDate = {new Date("2019-12-30 00:00:00")}/>
                <Day dayDate = {new Date("2019-12-31 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-01 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-02 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-03 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-04 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-05 00:00:00")}/>
            </div>
    );
};

export default Week;