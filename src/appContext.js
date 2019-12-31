import React, { useState } from "react";

const AppContext = React.createContext();


function AppContextProvider (props) {

    //Temp to replace database
    const tasks = [
        {key : "1", time: new Date('2018-11-28T00:00:00').getTime(), title: "Miss. T", description: "This is verykjf hasdjfh ksd hfkjsdah" },
        {key : "2", time: new Date('2019-12-30T01:00:00').getTime(), title: "Today 2  2 2 2 2 2", description: "stuff 2 do" },
        {key : "3", time: new Date('2019-12-31T02:00:00').getTime(), title: "Today 3", description: "stuff 2 do  - 3" },
        {key : "4", time: new Date('2019-12-31T03:00:00').getTime(), title: "Today 4", description: "stuff 2 do  - 4" },
        {key : "5", time: new Date('2019-12-31T04:00:00').getTime(), title: "Today 5", description: "stuff 2 do  - 5" },
        {key : "6", time: new Date('2020-01-01T05:00:00').getTime(), title: "Today 6", description: "stuff 2 do  - 6" },
        {key : "7", time: new Date('2020-01-01T06:00:00').getTime(), title: "Today 7", description: "stuff 2 do  - 7" },
        {key : "8", time: new Date('2020-01-02T07:00:00').getTime(), title: "Today 8", description: "stuff 2 do  - 8" },
        {key : "9", time: new Date('2020-01-02T08:00:00').getTime(), title: "Today 9", description: "stuff 2 do  - 9" },
        {key : "10", time: new Date('2020-01-02T00:00:00').getTime(), title: "Miss. T", description: "This is verykjf hasdjfh ksd hfkjsdah" },
        {key : "12", time: new Date('2020-01-02T01:00:00').getTime(), title: "Today 12  2 2 2 2 2", description: "stuff 2 do" },
        {key : "13", time: new Date('2020-01-02T02:00:00').getTime(), title: "Today 13", description: "stuff 2 do  - 13 and Stuffffffff" },
        {key : "14", time: new Date('2020-01-03T03:00:00').getTime(), title: "Today 14", description: "stuff 2 do  - 14 ldfsk d;slaf ;ld sf;ljds jdh fkjs dhkfjdsh fkjdsh fkjdshf ;lkdsjhfds;" },
        {key : "15", time: new Date('2020-01-04T04:00:00').getTime(), title: "Today 15", description: "stuff 2 do  - 15 dsi ujhdf kjhds as bewqgfpqndbclz,3wb qpo ihbp flzb" },
        {key : "16", time: new Date('2020-01-04T05:00:00').getTime(), title: "Today 16", description: "stuff 2 do  - 16" },
        {key : "17", time: new Date('2020-01-05T06:00:00').getTime(), title: "Today 17", description: "stuff 2 do  - 17" },
        {key : "18", time: new Date('2020-01-06T07:00:00').getTime(), title: "Today 18", description: "stuff 2 do  - 18" },
        {key : "19", time: new Date('2020-01-06T08:00:00').getTime(), title: "Today 19", description: "stuff 2 do  - 19" },
    ];

    function getTasks(startTime, endTime) {
        let startAt;
        let endAt;

        if (startTime) {startAt = startTime} else {return taskData};
        if (endTime) {endAt = endTime} 
        const taskSet = tasks.filter( item => item.time > startAt && item.time < endAt   ); 
        /* console.log("startAt: "+startAt+" , endAt: "+endAt);
        console.log(taskSet); */

        return taskSet;        
    }

    const [taskData, setTaskData] = useState(tasks);
    const [currentDate, setCurrentDate] = useState(new Date('2019-12-30'));

    return (
        <AppContext.Provider value={{taskData, currentDate, getTasks}}>
            {props.children}
        </AppContext.Provider>
    );
};

export {AppContextProvider, AppContext}