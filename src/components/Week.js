import React, {useState, useContext, useEffect} from 'react';
import Day from './Day.js';
import {AppContext} from '../appContext.js';

// import {AppContext} from '../appContext.js';

/* const days = [
    new Date("2019-12-30 00:00:00"),
    new Date("2019-12-31 00:00:00"),
    new Date("2020-01-01 00:00:00"),
    new Date("2020-01-02 00:00:00"),
    new Date("2020-01-03 00:00:00"),
    new Date("2020-01-04 00:00:00"),
    new Date("2020-01-05 00:00:00"),
]; */

function Week () {

    const [weekDefocus, setWeekDefocus] = useState(false);

    const {focusDate} = useContext(AppContext);
    
    function getWeekFirstDay(date) {
        
        let weeksFirstDay = new Date( date.setDate( date.getDate() - date.getDay() ));
        console.log("DATE ! ! !: "+weeksFirstDay)
        return weeksFirstDay;
    };

    console.log("focusDate is : "+focusDate);
    let firstDayOfWeek = getWeekFirstDay(focusDate);
    let weekDays = [new Date(firstDayOfWeek),
        new Date(firstDayOfWeek),
        new Date(firstDayOfWeek),
        new Date(firstDayOfWeek),
        new Date(firstDayOfWeek),
        new Date(firstDayOfWeek),
        new Date(firstDayOfWeek) 
    ];
    weekDays.forEach( (dayItem, i) => {
        /* console.log(firstDayOfWeek.getDate());
        console.log(dayItem.setDate(2));
        console.log(dayItem.setDate(3));
        console.log(dayItem.setDate(4)); */
        return new Date(dayItem.setDate( firstDayOfWeek.getDate()+i)) } );
    
    /* let weekDays = (function(){
        
        console.log("WEEK SAY:  -----   firstDayOfWeek are : "+firstDayOfWeek)
        
        return weekDays;
        console.log("WEEK SAY:  -----   weekDays are : "+weekDays);
        return weekDays.map( day=>{ day.setDate } )
    })(); */

    /* const {currentDate} = useContext(AppContext);
    const weeksDays = [currentDate.getDay() ] */

    return (       
        <div className="week">
            {weekDefocus && <div className="week-defocus"/>}
            {weekDays.map(date => <Day dayDate={date} key={date} weekDefocus={weekDefocus} setWeekDefocus={setWeekDefocus} />)}
        </div>
    );
};

export default Week;