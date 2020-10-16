const fs = require('fs');
const http = require('http');
const logPath = './logger/log.json';
const sampleLogPath = './logger/sampleLog.json';

let lastStatus;

let log;

/**
 * Checks if theres an internet connection at the given interval
 * @param {int} interval 
 */
const ping = (interval = 1000) => {
    
    checkInternet(online => {

        const ts = new Date();

        if(online)
        {
            //last status WASN'T online, so we add a new log item
            if(lastStatus !== online)
            {
                log.push(createLogEvent(ts.getTime(),'in'));
                writeLog(log);

                console.log(ts,'Uptime Status changed to online');
            }
        }
        else
        {
            //last status WAS online, so we update the last log item to add an out date
            if(lastStatus !== online)
            {
                log[log.length - 1].out = ts.getTime();
                writeLog(log);

                console.log(ts,'Uptime Status changed to offline');
            }
        }

        lastStatus = online;

        setTimeout(() => {
            ping(interval)
        },interval);
    })
};

const createLogEvent = (time,type) => {
    
    const obj = {in : time, out : 0};
    obj[type] = time;

    return obj;
};

/**
 * Attempts
 * @param {Function} cb calback function that takes a single boolean param representing whether the DNS lookup was successful
 */
const checkInternet = cb => {
    require('dns').lookup('google.com',err => {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}

const readLog = cb =>
{
    fs.readFile(logPath,'utf8',(err,raw) => {
        
        console.log('reading log');
        
        if(!err)
        { 
            try
            {
                let data = JSON.parse(raw);
    
                console.log('log successfully read');
    
                cb(data);
            }
            catch(e)
            {
                console.error('Error reading',logPath,'reseting');
                console.log(logPath);
                console.log(raw);

                writeLog([],() => {
                    readLog(cb);
                })
            }
        }
        else
        {

            if(err.code === 'ENOENT')
            {
                fs.writeFile(logPath,'[]',{},err => {

                    if(!err)
                    {
                        console.log('Creating Log File');
                        cb('[]');
                    }
                    else
                    {
                        console.error(err);
                    }
                });
            }
            else
            {
                console.error(err);
            }
        }
    })
}   

const writeLog = (arrIn,cb = () => {},fileName = logPath) => {

    //get rid of any items with default data

    const arr = arrIn.filter(e => e.in !== 0 && e.out !== 0);

    fs.writeFile(fileName,JSON.stringify(arr),e => {

        if(e)
        {
            console.error(e);
        }
        else
        {
            cb();
        }
    });
}


const init = () => {

    console.log('ISP Uptime Log Started...');

    readLog(data => {

        console.log('Initializing Logger');
        
        //intialize the log array
        log = data;

        if(log.length === 0)
        {
            log.push(createLogEvent(new Date().getTime(),'in'));
            //console.log(log);
        }

        //initialize the lastStatus
        checkInternet(online => {

            console.log('Creating log servers');
            createServer(logPath,3001);
            createServer(sampleLogPath,3002);

            console.log('\n\n=====\n\n');

            lastStatus = online;
            ping();
        })
        
    });

    
};

const createServer = (jsonPath,port) => {

    const server = http.createServer((req,res) => {

        res.setHeader('Content-Type','text/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);

        fs.readFile(jsonPath,{},(err,json) => {

            if(err)
            {
                res.end(JSON.stringify(err));
            }
            else
            {
                res.end(json);
            }
        })
    });

    server.listen(port);
}

/**
 * TODO:
 * ability to pass the number of data points to generate with the argument flag
 * 
 */
const generateSampleData = () =>
{
    const numEvents = 31;

    const minOutage = 30000; //30 seconds
    const maxOutage = 1800000; //30 minutes
    
    const maxInterval = 259200000; //3 days
    const minInterval = 7200000; //2 hour

    let now = new Date().getTime();
    let sampleLog = [];

    for(let e = 0; e < numEvents; e++)
    {
        let outTime = Math.round(Math.random() * (maxOutage - minOutage) + minOutage);
        let nextInTime = Math.round(Math.random() * (maxInterval - minInterval) + minInterval);
        
        //inTime *= 1000;
        //outTime *= 1000;

        const event = {
            'in' : now,
            'out' : now + outTime
        };

        sampleLog.push(event);

        now += outTime + nextInTime;
    }

    writeLog(sampleLog,()=>{},sampleLogPath);

    console.log('Sample log data successfully created');
}

const handleArg = arg =>
{
    switch(arg)
    {
        case '-s':
            generateSampleData();
            break;
        default:
            console.warn(arg,"is not a recognized arg");
            break;
    }
}

if(process.argv.length === 2)
{
    init();
}
else
{
    for(let i = 2; i < process.argv.length; i++)
    {
        let arg = process.argv[i];

        handleArg(arg);
    }
}
