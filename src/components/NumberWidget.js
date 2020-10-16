import React,{useEffect,useState} from "react";

const NumberWidget = ({start=0, //the start value
                        end, //the end value
                        interval=100, //the speed of the cycles (ms)
                        increment=1, //the number by which to increment counter each cycle
                        formatter = num => num //a function to format the number for display
                                                //defaults to a function that returns its input
                    }) => 
{
    
    const countUp = (stateSetter,end,start = 0,interval = 100,cur) =>
    {
        cur = cur === undefined ? start : cur;

        setTimeout(()=>{

            cur += increment;

            stateSetter(formatter(cur));

            if(cur < end)
            {
                countUp(stateSetter,end,start,interval,cur);
            }
            
        },interval);
    }

    const [count,setCount] = useState(0);

    useEffect(()=>{

        if(!isNaN(end))
            countUp(setCount,end,start,interval);

        return ()=>{}
        
    });

    return (<div className="NumberWidget">
        <span className="NumberWidget__number">{count}</span>
    </div>);
}

export default NumberWidget;