export const getDisconnectionsByDay = day => {
    console.log('TODO: add this functionality');
}

/**
 * 
 * @param {Object[]} log an array of log events to parse 
 * @param {*} includeZeros [default false] whether or not to include days without events
 * @return Object an object of tallied events per day, key names are date stamps, values are that day's
 */
export const tallyDisconnectionsByDay = (log,includeZeros = false) => {

    const talliedLog = {};

    log.forEach(event => {

        if(event.out !== 0)
        {
            const date = new Date(event.out);

            const dayStr = makeDateStamp(date);

            if(!talliedLog[dayStr])
            {
                talliedLog[dayStr] = 0;
            }

            talliedLog[dayStr]++;
        }
        
    });

    return includeZeros ? injectNoEventDays(talliedLog) : talliedLog;
}

export const makeDateStamp = date => {
    
    date = typeof date != 'object' ? new Date(date) : date;

    return `${date.getFullYear()}-${maybePrefix(date.getMonth() + 1)}-${maybePrefix(date.getDate())}`;
}

/**
 * Takes a number and prefixes it with 0 if it's below 10
 * @param {Number|String} num 
 * @return {String}
 */
export const maybePrefix = num => Number(num) < 10 ? `0${num}` : String(num);

/**
 * 
 * @param {*} log 
 */
export const injectNoEventDays = log => {

    const logWithZeros = {};
    const dates = Object.keys(log);

    if(dates.length === 0) return log;

    const lastStamp = dates[dates.length - 1];
    
    let curTime = new Date(makeDateStamp(new Date())).getTime();
    let curStamp = makeDateStamp(curTime);

    const lastTime = new Date(lastStamp).getTime();

    const twentyFourHours = 1000 * 60 * 60 * 24;

    while(curTime <= lastTime)
    {
        curStamp = makeDateStamp(curTime);

        logWithZeros[curStamp] = log[curStamp] === undefined ? 0 : log[curStamp];

        curTime += twentyFourHours;
    }

    //console.log(logWithZeros);

    return logWithZeros;
}

export const getAverageDuration = log => {

    const durations = log.map(l => l.out - l.in);
    let sum = 0;
    durations.forEach(dur => sum += dur);

    return Math.round(sum / durations.length);
}

export const getAverageDisconnects = log => {
    
    const disconnects = tallyDisconnectionsByDay(log);
    let totDisconnects = 0;
    
    Object.keys(disconnects).forEach(day=>{
        totDisconnects += Number(disconnects[day]);
    });

    return Math.round(totDisconnects/Object.keys(disconnects).length);
}

export const msToTimeObj = durationInMillis =>
{

    const millis = durationInMillis % 1000;
    const second = (durationInMillis / 1000) % 60;
    const minute = (durationInMillis / (1000 * 60)) % 60;
    const hour = (durationInMillis / (1000 * 60 * 60)) % 24;

    return {millis,second,minute,hour};
}