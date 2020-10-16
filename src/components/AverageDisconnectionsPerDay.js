import React from "react";
import NumberWidget from './NumberWidget';
import {getAverageDisconnects} from '../data-functions';

const AverageDisconnectionsPerDay = ({log}) => {

    
    const tot = getAverageDisconnects(log);

    return (<div className="AverageDisconnectionsPerDay DashboardWidget">
        <h2 className="AverageDisconnectionsPerDay__title DashboardWidget__title">Average Disconnections Per Day</h2>
        <div className="AverageDisconnectionsPerDay__number">
            <NumberWidget end={tot} />
        </div>
    </div>);
}

export default AverageDisconnectionsPerDay;