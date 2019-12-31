import React, {useContext, useState } from 'react';
import Day from './Day.js';

import {AppContext} from 'C:/Users/Denise/Desktop/Ori - WEB/TaskCalendar/V_0.0.0/task-calendar/src/appContext.js';
import TaskForm from './TaskForm.js';

function Week (props) {

    const {currentDate} = useContext(AppContext);
    const weeksDays = [currentDate.getDay() ]
    const [forms, setForms] = useState();

    function submitForm(forms){
        console.log("submit this: "+forms);
        setForms();
    }

    function weekHandleClick(){
        forms ? submitForm(forms) : setForms( () => <TaskForm/>);
        console.log ("new form: "+forms);
    }

    return (       
            <div className="week" onClick={weekHandleClick}>
                <Day dayDate = {new Date("2019-12-30 00:00:00")}/>
                <Day dayDate = {new Date("2019-12-31 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-01 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-02 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-03 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-04 00:00:00")}/>
                <Day dayDate = {new Date("2020-01-05 00:00:00")}/>
                {forms}
            </div>
    );
};

export default Week;