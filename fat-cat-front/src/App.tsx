import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import Home from './components/home/Home';
import Reports from './components/reports/Reports';

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
  user_id: number,
  created_at: Date,
  finished_at: Date,
}

export const TimerContext = React.createContext<Partial<TimerContextTypes>>({});

function App() {
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [clockActive, setClockActive] = useState<boolean>(false);
  const [reports, setReports] = useState<Report[]>([]);

  return (
    <TimerContext.Provider value={{ timeSpent, setTimeSpent, totalTimeSpent, setTotalTimeSpent, clockActive, setClockActive, intervalID, setIntervalID }}>
      <Router>
        <Switch>
          <Route path="/reports">
            <Reports reports={reports} />
          </Route>
          <Route path="/">
            <Home reports={reports} setReports={setReports} />
          </Route>
        </Switch>
      </Router>
    </TimerContext.Provider>
  );
}

export default App;
