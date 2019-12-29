import React, { useContext } from 'react';
import Day from './Day.js';

import {AppContext} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';

function Week (props) {

    const {currentDate} = useContext(AppContext);
    const weeksDays = [currentDate.getDay() ]


    return (       
            <div className="week">
                <Day date/>
                <Day/>
                <Day/>
                <Day/>
                <Day/>
                <Day/>
                <Day/>
            </div>
    );
};

export default Week;