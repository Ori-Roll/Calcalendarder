import React, { useState } from "react";

const AppContext = React.createContext();

function AppContextProvider(props) {
	//Temp to replace database
	const tasks = [
		/* {
			key: "1",
			startDate: new Date("2018-11-28T00:00:00"),
			endDate: new Date("2018-11-28T10:20:00"),
			title: "Miss. T",
			description: "This is verykjf hasdjfh ksd hfkjsdah",
			color: "red"
		},
		{
			key: "2",
			startDate: new Date("2019-12-30T01:00:00"),
			endDate: new Date("2019-12-30T11:10:00"),
			title: "Today 2 ldksjf dslkja [ods'l hfnj;ks bnfkljsfgkjlfbngjk]  2 2 2 2 2",
			description: "stuff 2 dfadsf asdfdsafdsafo"
		},
		{
			key: "3",
			startDate: new Date("2019-12-31T12:00:00"),
			endDate: new Date("2019-12-31T12:05:00"),
			title: "Today 3 klsjfg hfdkjgh jkfd hgjlkfd",
			description: "stuff 2 dfads fds fa fd o  - 3"
		},
		{
			key: "4",
			startDate: new Date("2019-12-31T13:00:00"),
			endDate: new Date("2019-12-31T14:55:00"),
			title: "Today 4",
			description: "stuff fdsa ff adsf fds 2 do  - 4fdslkj fhsdlf lsd n"
		},
		{
			key: "5",
			startDate: new Date("2019-12-31T14:00:00"),
			endDate: new Date("2019-12-31T14:10:00"),
			title: "Today 5",
			description: "stuff 2f dsf  fdsaf sdf fds  fsddo  - 5",
			color: "red"
		},
		{
			key: "6",
			startDate: new Date("2020-01-01T15:00:00"),
			endDate: new Date("2020-01-01T15:50:00"),
			title: "Today 6 gf;ldkkj hgfdljg hfdkjg hfdkjg hfdlkg",
			description: "stuffsdaf dsaf sdaf awesf df ds fa sdfdf 2 do  - 6"
		},
		{
			key: "7",
			startDate: new Date("2020-01-01T16:00:00"),
			endDate: new Date("2020-01-01T16:30:00"),
			title: "Today 7",
			description: "dfs asdf sdaf sda fasd fd saf asdf dsf sdaf dsfa ",
			color: "red"
		},
		{
			key: "8",
			startDate: new Date("2020-01-02T17:00:00"),
			endDate: new Date("2020-01-02T17:10:00"),
			title: "Today 8",
			description: "sdfa dasf dsfa adsf dsfa dsag fsda f sdaf dsafdasf sa",
			color: "green"
		},
		{
			key: "9",
			startDate: new Date("2020-01-02T18:00:00"),
			endDate: new Date("2020-01-02T18:55:00"),
			title: "Today 9",
			description: "stuff 2 do  - 9",
			color: "gray"
		},
		{
			key: "10",
			startDate: new Date("2020-01-02T06:00:00"),
			endDate: new Date("2018-11-28T15:55:00"),
			title: "Miss. T",
			description: "This is verykjf hasdjfh ksd hfkjsdah"
		},
		{
			key: "11",
			startDate: new Date("2020-01-02T11:00:00"),
			endDate: new Date("2020-01-02T11:00:00"),
			title: "Today 12  2 2 2 2 2",
			description: "stuffdfsdaf adsf sdaf sadf sdaf fdsa dsaf dsa dsa fadsf  2 do"
		},
		{
			key: "12",
			startDate: new Date("2020-01-02T12:00:00"),
			endDate: new Date("2019-12-31T12:00:00"),
			title: "Today 13!",
			description: "stuff dsaf asdf sdaf asdf fadsf f 2 do  - 13 and Stuffffffff"
		},
		{
			key: "13",
			startDate: new Date("2020-01-03T13:00:00"),
			endDate: new Date("2019-12-31T13:10:00"),
			title: "Today 14 lkgfjdh g9ouie dijk dnjkd ijkd bhdkjd bhdkj k",
			description:
				"stuff af sdaf sdaf asdf fdsa 2 do  - 14 ldfsk d;slaf ;ld sf;ljds jdh fkjs dhkfjdsh fkjdsh fkjdshf ;lkdsjhfds;"
		},
		{
			key: "14",
			startDate: new Date("2020-01-04T14:00:00"),
			endDate: new Date("2019-12-31T15:50:00"),
			title: "Today 15",
			description: "stuff 2 do  - 15 dsi ujhdf kjhds as bewqgfpqndbclz,3wb qpo ihbp flzb"
		},
		{
			key: "15",
			startDate: new Date("2020-01-04T15:00:00"),
			endDate: new Date("2020-01-01T17:60:00"),
			title: "Today 16",
			description: "f asdf dsaf sdag rsdf fsdg gsf dg ag sfdg ",
			color: "gray"
		},
		{
			key: "16",
			startDate: new Date("2020-01-05T16:00:00"),
			endDate: new Date("2020-01-01T16:10:00"),
			title: "Today 17",
			description: "gs dfg gfsd sdfg gs g sdfg fsdg fdsg gfds fsdfgd ",
			color: "purple"
		},
		{
			key: "17",
			startDate: new Date("2020-01-06T17:00:00"),
			endDate: new Date("2020-01-02T17:30:00"),
			title: "Today 18",
			description: "stuff 2 do  - 18sgfd fdsg gdfs g fdsg gs gfd "
		},
		{
			key: "18",
			startDate: new Date("2020-01-06T18:00:00"),
			endDate: new Date("2020-01-02T18:30:00"),
			title: "Today 19",
			description: "stuff 2 do  - 19 sfdgg fsfdg dsfg fds ygeraf "
		} */
	];

	const [taskData, setTaskData] = useState(tasks);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [focusDate, setFocusDate] = useState(new Date("2020-01-08T06:00:00"));

	function setNewTask(newTask) {
		// taskData needs to be ordered by date of tasks:

		let prevTask = taskData.find(
			(item, i) => newTask.startDate.getTime() < item.startDate.getTime()
		);

		let taskPosition = prevTask === undefined ? taskData.length : taskData.indexOf(prevTask);
		/* taskPosition = taskPosition < 0 ? 0 : taskPosition; */

		setTaskData(prevData => {
			prevData.splice(taskPosition, 0, newTask);
			return prevData;
		});
	}

	function removeTaskWithKey(removedTaskKey) {
		console.log("remove task with key :" + removedTaskKey);


		// if findIndex  doesn't find a match it will return -1.
		// splicing on index -1 will remove the last element in the array.
		// that is noy wanted 
		taskData.splice(
			taskData.findIndex(item => item.key === removedTaskKey),
			1
		);
		console.log("taskData is now :", taskData);
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
				removeTaskWithKey
			}}>
			{props.children}
		</AppContext.Provider>
	);
}

export { AppContextProvider, AppContext };

//OLD--------------------------------------------------------------------

/* function getTasks(startDate, endTime) {
        let startAt;
        let endAt;

        if (startDate) {startAt = startDate} else {return taskData};
        if (endTime) {endAt = endTime} 
        const taskSet = tasks.filter( item => item.startDate > startAt && item.tistartTimeme < endAt   ); 

        return taskSet;        
    } */

/* 
        newTaskData = taskData;
        for(let i = 0; i < tasks.length; i++ ){

            if (tasks[i].startDate < newTask.startDate) {
                console.log("CONTAXT:  tasks[i].startDate < newTask.startDate,  newTask: ", newTask)
            } 

            else if (tasks[i].startDate >= newTask.startDate) {
                newTaskData.splice(i, 0, newTask); 
                console.log("CONTAXT:  tasks[i].startDate >= newTask.startDate,  newTask: ", newTask)
                break; }

            else if (i < tasks.length-1) {
                newTaskData.push(newTask);
                console.log("CONTAXT:   i === tasks.length-1,  newTask: ", newTask)

            } else {
                newTaskData.push(newTask);
                console.log("CONTAXT: else ,  newTask: ", newTask);
            };
        }; 
        
        setTaskData(newTaskData); */
