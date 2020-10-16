import React from "react";
import { msToTimeObj,maybePrefix } from "../data-functions";

const Duration = ({ms}) => {

    const time = msToTimeObj(ms);

    return (<span className="Duration">
        <span className="Duration__time Duration__time--hour">{maybePrefix(Math.round(time.hour))}</span>
        <span className="Duration__label Duration__label--hour">h</span>
        
        <span className="Duration__time Duration__time-minute">{maybePrefix(Math.round(time.minute))}</span>
        <span className="Duration__label Duration__label--minute">m</span>
        
        <span className="Duration__time Duration__time-second">{maybePrefix(Math.round(time.second))}</span>
        <span className="Duration__label Duration__label--second">s</span>
    </span>);
}

export default Duration;