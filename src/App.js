import React,{useState,useEffect} from 'react';
import TotalDisconnections from './components/TotalDisconnections';
import axios from 'axios';
import AverageDisconnectionsPerDay from './components/AverageDisconnectionsPerDay';
import AverageOutageDuration from './components/AverageOutageDuration';

const App = () => {

  const [log,setLog] = useState([]);
  const debugging = false;
  const port = debugging ? 3002 : 3001;

  useEffect(()=>{

    axios.get(`http://localhost:${port}`).then(resp => {
        //console.log('set log',resp.data);
        setLog(resp.data);
      });

    return ()=>{};
  },[port])
      

  return (
    <div className="App">
      <h1>ISP Uptime Dashboard</h1>
      <div className="App__widgets">
        <TotalDisconnections log={log} />
        <AverageDisconnectionsPerDay log={log} />
        <AverageOutageDuration log={log} />
      </div>
    </div>
  );
}

export default App;
