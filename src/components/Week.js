import React, {useState, useContext} from 'react';
import Day from './Day.js';
import {AppContext} from '../appContext.js';

// import {AppContext} from '../appContext.js';

const days = [
    new Date("2019-12-30 00:00:00"),
    new Date("2019-12-31 00:00:00"),
    new Date("2020-01-01 00:00:00"),
    new Date("2020-01-02 00:00:00"),
    new Date("2020-01-03 00:00:00"),
    new Date("2020-01-04 00:00:00"),
    new Date("2020-01-05 00:00:00"),
];

function Week () {

    const {currentDate} = useContext(AppContext);
    
    function getWeekFirstDay(date) {
        let weekFirstDay = new Date( date.setDate( date.getDate() - date.getDay() ));
    };

    getWeekFirstDay(new Date("2020-03-01 00:00:00"));

    /* const {currentDate} = useContext(AppContext);
    const weeksDays = [currentDate.getDay() ] */

    return (       
        <div className="week">
            {days.map(date => <Day dayDate={date} key={date} />)}
        </div>
    );
};

export default Week;