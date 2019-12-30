import React, { useContext } from 'react';
import Day from './Day.js';

import {AppContext} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';

function Week (props) {

    const {currentDate} = useContext(AppContext);
    const weeksDays = [currentDate.getDay() ]


    return (       
            <div className="week">
                <Day dayDate = {"2019-12-30"}/>
                <Day dayDate = {"2019-12-31"}/>
                <Day dayDate = {"2020-01-01"}/>
                <Day dayDate = {"2020-01-02"}/>
                <Day dayDate = {"2020-01-03"}/>
                <Day dayDate = {"2020-01-04"}/>
                <Day dayDate = {"2020-01-05"}/>
            </div>
    );
};

export default Week;