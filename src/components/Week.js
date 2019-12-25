import React from 'react';
import Day from './Day.js';

function Week (props) {

    return (       
            <div className="week">
                <Day/>
                <Day/>
                <Day/>
                <Day/>
                <Day/>
                <Day/>
                <Day/>
            </div>
    );
};

export default Week;