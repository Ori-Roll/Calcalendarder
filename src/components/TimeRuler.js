import React, { useState } from "react";


function TimeRuler(){

    const hoursToDisplay = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

    const [mouseIsOverTime, setMouseIsOverTime] = useState(false);
    
    function timeOnMouseOver(){

    }

    return (
        <div className="time-ruler">
        {hoursToDisplay.map( item => <p 
                                        /* onMouseOver={setMouseIsOverTime(true)}  */
                                        /* onMouseOut={setMouseIsOverTime(false)}  */
                                        /* style={mouseIsOverTime ? {color: "black"} : {color: "white"} } */
                                        > {item}
                                    </p> 
                            )
        }
        </div>
    )
};

export default TimeRuler;