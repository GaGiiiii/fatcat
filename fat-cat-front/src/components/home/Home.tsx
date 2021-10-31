import React, { useCallback, useContext } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import './home.css';
import Timer from './Timer';
import { getHoursG, getMinutesG } from '../../Helpers';
import { Header } from '../header/Header';
import { Link } from 'react-router-dom';
import { ApiContext, Report, TimerContext } from '../../App';
import axios from 'axios';

interface Props {
  reports: Report[],
  setReports: React.Dispatch<React.SetStateAction<Report[]>>
  activeReport?: Partial<Report>,
  setActiveReport?: React.Dispatch<React.SetStateAction<Partial<Report>>>
}

const Home: React.FC<Props> = ({ reports, setReports, activeReport, setActiveReport }) => {
  const TimerContextVar = useContext(TimerContext);
  const api = useContext(ApiContext);

  const startTimer = useCallback((): void => {
    let intervalIDParam: number = window.setInterval(() => {
      TimerContextVar.setTimeSpent!(prev => prev + 1);
    }, 1000);
    TimerContextVar.setIntervalID!(intervalIDParam);
  }, [TimerContextVar.setIntervalID, TimerContextVar.setTimeSpent]);

  const saveReport = useCallback((): void => {
    axios.post(`${api}/reports`, { UserId: 1 }).then(response => {
      let report: Report = {
        id: response.data.id,
        UserId: response.data.UserId,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      }
      setActiveReport!(report);
    }).catch((error) => {
      console.log(error);
    });
  }, [api, setActiveReport]);

  const updateReport = useCallback((): void => {
    axios.put(`${api}/reports/${activeReport!.id}`, { UserId: 1 }).then(response => {
      let report: Report = {
        id: response.data.id,
        UserId: response.data.UserId,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
      }
      /* 
        When We Reload Page Report Will Exist In Array So We Don't Need to Add It Again, We Just Need To Update It
      */
      let reportsC = [...reports];
      let foundIndex = reportsC.findIndex(r => r.id === activeReport!.id);
      if (foundIndex === -1) {
        reportsC.push(report);
      } else {
        reportsC[foundIndex] = report;
      }
      setReports(reportsC);
      clearInterval(TimerContextVar.intervalID!);
      TimerContextVar.setTotalTimeSpent!(prev => prev + TimerContextVar.timeSpent!);
      TimerContextVar.setTimeSpent!(0);
    }).catch((error) => {
      console.log(error);
    });
  }, [TimerContextVar.intervalID, TimerContextVar.setTimeSpent, TimerContextVar.setTotalTimeSpent, TimerContextVar.timeSpent, activeReport, api, reports, setReports]);

  function handleClockIn(): void {
    if (!TimerContextVar.clockActive) {
      startTimer();
      saveReport();
    } else {
      updateReport();
    }
    TimerContextVar.setClockActive!(prev => !prev);
  }

  return (
    <Container fluid className='px-0' style={{ overflowX: 'hidden' }}>
      <Row>
        <Col>
          <Header currentPage='home' />
          <Container>
            <Row className=''>
              <Col>
                <div className="mt-3">
                  <h6 className='text-justify total-time'>Total time spent today: <span className='fw-bold'>{`${getHoursG(TimerContextVar.totalTimeSpent !== undefined ? TimerContextVar.totalTimeSpent : 0)}h ${getMinutesG(TimerContextVar.totalTimeSpent !== undefined ? TimerContextVar.totalTimeSpent : 0)}m`}</span></h6>
                </div>
                <Timer />
                <div className='mt-5'>
                  <Link to="/reports">
                    <Button className='w-100 reports-btn'>
                      Reports
                    </Button>
                  </Link>
                  <Button className={`w-100 mt-3 clock-in-btn${TimerContextVar.clockActive! ? ' active-clock' : ''}`} onClick={handleClockIn}>
                    {TimerContextVar.clockActive! ? 'Clock out' : 'Clock in'}
                  </Button>
                  <p className={`text-muted help-text mt-2${TimerContextVar.clockActive! ? ' red' : ''}`}>Clicking <span className='text-uppercase fw-bold'>{TimerContextVar.clockActive! ? 'Clock out' : 'Clock in'}</span> button will {TimerContextVar.clockActive! ? 'stop' : 'start'} the time counter.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container >
  )
}

export default Home;