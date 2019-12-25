import React from 'react';
import Task from './Task.js'

function Day(props) {

    let dayTitle = <p className="dayTitle">This is the day</p>
    let dayContent = [<p className="task">task1</p>, <p  className="task">task2</p>, <p  className="task">task3</p>]


    return (
        <div className="day">
            {dayTitle}
            <Task/>
            <Task/>
            <Task/>
        </div>
    );
};

export default Day;