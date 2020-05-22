import React, { useState, useEffect } from "react";
import { getInitTasks, getTodayDate } from "./components/helpers";

const AppContext = React.createContext();

function AppContextProvider(props) {
	// Mock data (replaces database)

	const [taskData, setTaskData] = useState(getInitTasks());
	const [currentDate, setCurrentDate] = useState(new Date());
	const [focusDate, setFocusDate] = useState(getTodayDate());

	function setNewTask(newTask) {
		// taskData needs to be ordered by date of tasks:
		setTaskData((prevData) => {
			const newData = [...prevData, newTask];

			newData.sort((a, b) => {
				if (a.startDate.getTime() < b.startDate.getTime()) {
					return -1;
				} else if (a.startDate.getTime() > b.startDate.getTime()) {
					return 1;
				} else {
					return 0;
				}
			});
			return newData;
		});
	}

	function removeTaskWithKey(removedTaskKey) {
		const newTaskData = [...taskData];
		let taskIndex = taskData.findIndex((item) => item.key === removedTaskKey);
		taskIndex > -1 ? newTaskData.splice(taskIndex, 1) : console.log("no matching task key");
		setTaskData(newTaskData);
	}

	function replaceTasks(oldTaskKey, newTask) {
		removeTaskWithKey(oldTaskKey);
		setNewTask(newTask);
		console.log("adsgfasdgfasdg");
	}

	return (
		<AppContext.Provider
			value={{
				taskData,
				setTaskData,
				currentDate,
				setCurrentDate,
				setNewTask,
				focusDate,
				setFocusDate,
				replaceTasks,
				removeTaskWithKey,
			}}>
			{props.children}
		</AppContext.Provider>
	);
}

export { AppContextProvider, AppContext };
