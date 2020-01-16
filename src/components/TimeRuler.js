import React, { useState } from "react";


function TimeRuler(props){

    

    const [mouseIsOverTime, setMouseIsOverTime] = useState(false);
    
    function timeOnMouseOver(){

    }

    function creacteIndex(iNum){

    };

    console.log("props timesStyle: ", props.timesStyle)

    return (
        <div className="time-ruler">
        {props.hoursToDisplay.map( item => <div key = {item.key}
                                                className = "time-ruler-text"
                                                hourindex = {item.index}
                                                style = {props.timesStyle}
                                        /* onMouseOver={setMouseIsOverTime(true)}  */
                                        /* onMouseOut={setMouseIsOverTime(false)}  */
                                        /* style={mouseIsOverTime ? {color: "black"} : {color: "white"} } */
                                        > {item.hour}
                                    </div> 
                            )
        }
        </div>
    )
};

export default TimeRuler;