import React, { useState } from "react";

const AppContext = React.createContext();


function AppContextProvider (props) {

    //Temp to replace database
    const tasks = [
        {id : "1", time: getTime(new Date('2018-11-28T01:00:00')), title: "Miss. T", detail: "This is very important" }
    , {id : "2", time: getTime(new Date()), title: "Today", detail: "stuff 2 do" }
    ];


    const [tasks, setTasks] = useState(tasks);

    return (
        <AppContext.Provider value={{tasks}}>
            {props.children}
        </AppContext.Provider>
    );
};

export {AppContextProvider, AppContext}