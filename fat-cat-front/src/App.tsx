import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import Home from './components/home/Home';
import Reports from './components/reports/Reports';
import axios from 'axios';

interface TimerContextTypes {
  timeSpent: number,
  setTimeSpent: React.Dispatch<React.SetStateAction<number>>,
  totalTimeSpent: number,
  setTotalTimeSpent: React.Dispatch<React.SetStateAction<number>>,
  clockActive: boolean,
  setClockActive: React.Dispatch<React.SetStateAction<boolean>>,
  intervalID: number,
  setIntervalID: React.Dispatch<React.SetStateAction<number>>
}

export interface Report {
  id: number,
  UserId: number,
  createdAt: Date,
  updatedAt: Date,
}

const api = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? "http://localhost:8000/api" : 'PRODUCTION_URL';
export const TimerContext = React.createContext<Partial<TimerContextTypes>>({});
export const ApiContext = React.createContext(api);

function App() {
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [clockActive, setClockActive] = useState<boolean>(false);
  const [activeReport, setActiveReport] = useState<Partial<Report>>({});
  const [reports, setReports] = useState<Report[]>([]);


  useEffect(() => {
    axios.get(`${api}/reports`).then(res => {
      let reportsG: Report[] = [];
      console.log(res.data)
      res.data.forEach((report: Report): void => {
        let reportG = {
          id: report.id,
          UserId: report.UserId,
          createdAt: report.createdAt,
          updatedAt: report.updatedAt
        }
        reportsG.push(reportG);
      });
      setReports(reportsG);
    }).catch(err => console.log(err));
  }, []);

  return (
    <ApiContext.Provider value={api}>
      <TimerContext.Provider value={{ timeSpent, setTimeSpent, totalTimeSpent, setTotalTimeSpent, clockActive, setClockActive, intervalID, setIntervalID }}>
        <Router>
          <Switch>
            <Route path="/reports">
              <Reports reports={reports} />
            </Route>
            <Route path="/">
              <Home reports={reports} setReports={setReports} activeReport={activeReport} setActiveReport={setActiveReport} />
            </Route>
          </Switch>
        </Router>
      </TimerContext.Provider>
    </ApiContext.Provider>
  );
}

export default App;
