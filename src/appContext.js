import React, { useState } from "react";

const AppContext = React.createContext();


function AppContextProvider (props) {

    //Temp to replace database
    const tasks = [
        {id : "1", time: new Date('2018-11-28T00:00:00').getTime(), title: "Miss. T", description: "This is verykjf hasdjfh ksd hfkjsdah" },
        {id : "2", time: new Date('2019-12-30T01:00:00').getTime(), title: "Today 2  2 2 2 2 2", description: "stuff 2 do" },
        {id : "3", time: new Date('2019-12-30T02:00:00').getTime(), title: "Today 3", description: "stuff 2 do  - 3" },
        {id : "4", time: new Date('2019-12-30T03:00:00').getTime(), title: "Today 4", description: "stuff 2 do  - 4" },
        {id : "5", time: new Date('2019-12-30T04:00:00').getTime(), title: "Today 5", description: "stuff 2 do  - 5" },
        {id : "6", time: new Date('2019-12-30T05:00:00').getTime(), title: "Today 6", description: "stuff 2 do  - 6" },
        {id : "7", time: new Date('2019-12-30T06:00:00').getTime(), title: "Today 7", description: "stuff 2 do  - 7" },
        {id : "8", time: new Date('2019-12-30T07:00:00').getTime(), title: "Today 8", description: "stuff 2 do  - 8" },
        {id : "9", time: new Date('2019-12-30T08:00:00').getTime(), title: "Today 9", description: "stuff 2 do  - 9" },
    ];

    function getTasks(startTime, endTime) {
        const startAt = "not";
        const endAt= "not";

        if (startTime) {startAt = startTime} else {return taskData};
        if (endTime) {endAt = endTime}
        else { }
        console.log("startAt: "+startAt+" , endAt: "+endAt);

        return taskData;        
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