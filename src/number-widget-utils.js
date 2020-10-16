export const countUp = (stateSetter,end,start = 0,interval = 100,cur) =>
{
    cur = cur == undefined ? start : cur;

    setTimeout(()=>{

        cur++;

        stateSetter(cur);

        if(cur < end)
        {
            countUp(stateSetter,end,start,interval,cur);
        }
        
    },interval);
}