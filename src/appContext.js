import React, { useState } from "react";

const AppContext = React.createContext();


function AppContextProvider (props) {

    //Temp to replace database
    const tasks = [
        {id : "1", time: new Date('2018-11-28T01:00:00').getTime(), title: "Miss. T", detail: "This is very important" }
    , {id : "2", time: new Date().getTime(), title: "Today", detail: "stuff 2 do" }
    ];


    const [taskData, setTaskData] = useState(tasks);
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <AppContext.Provider value={{taskData, currentDate}}>
            {props.children}
        </AppContext.Provider>
    );
};

export {AppContextProvider, AppContext}