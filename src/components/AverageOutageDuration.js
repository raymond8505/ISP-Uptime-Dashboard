import React from "react";
import NumberWidget from "./NumberWidget";
import {getAverageDuration} from "../data-functions";
import Duration from "./Duration";

const AverageOutageDuration = ({log}) => {

    const formatter = ms => {

        return <Duration ms={ms} />
    }
    
    return (<div className="AverageOutageDuration DashboardWidget">
        <h2 className="AverageOutageDuration__title DashboardWidget__title">
            Average Outage Duration
        </h2>
        <NumberWidget 
            end={getAverageDuration(log)} 
            increment={10000}
            interval={30}
            formatter={formatter} 
        />
    </div>);
}

export default AverageOutageDuration;