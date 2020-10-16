import React from "react";
import {tallyDisconnectionsByDay} from '../data-functions.js';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TotalDisconnections = ({log}) => {

    const talliedDisconnections = tallyDisconnectionsByDay(log,true);

    //console.log(talliedDisconnections);

    const disconnections = Object.keys(talliedDisconnections).map(date => talliedDisconnections[date]);

    //console.log(disconnections);

    const categories = Object.keys(talliedDisconnections);

    const chartOptions = {
            chart : {
                type : 'line',
                zoomType : 'x',
                reflow: true,
                
            },
            title : {
                text : ''
            },
            xAxis : {
                categories : categories
            },
            series : [
                {
                    name : 'Disconnections',
                    data : disconnections,
                    marker : {
                        enabled : false
                    }
                }
            ]
        };
    
        //if(log.length > 0) debugger;

    return (<div className="TotalDisconnections DashboardWidget">
        <h2 className="TotalDisconnections__title DashboardWidget__title">Total Disconnection Events Per Day</h2>
        <h3 className="TotalDisconnections__sub-title DashboardWidget__sub-title">Click and Drag to Zoom</h3>
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions} />
    </div>);
}

export default TotalDisconnections;