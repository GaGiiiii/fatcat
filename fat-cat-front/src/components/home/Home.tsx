import React, { useContext } from 'react'
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

  function handleClockIn(): void {
    if (!TimerContextVar.clockActive) {
      let intervalIDParam = window.setInterval(() => {
        TimerContextVar.setTimeSpent!(prev => prev + 1);
      }, 10);
      TimerContextVar.setIntervalID!(intervalIDParam);
      axios.post(`${api}/reports`, { UserId: 1 }).then(response => {
        console.log(response.data);
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
    } else {
      axios.put(`${api}/reports/${activeReport!.id}`, { UserId: 1 }).then(response => {
        console.log(response.data);
        // Add Report
        let report: Report = {
          id: response.data.id,
          UserId: response.data.UserId,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        }
        let reportsC = [...reports];
        reportsC.push(report);
        setReports(reportsC);
        clearInterval(TimerContextVar.intervalID!);
        TimerContextVar.setTotalTimeSpent!(prev => prev + TimerContextVar.timeSpent!);
        TimerContextVar.setTimeSpent!(0);
      }).catch((error) => {
        console.log(error);
      });
    }
    TimerContextVar.setClockActive!(prev => !prev);
  }

  return (
    <Container fluid className='g-0'>
      <Row>
        <Col>
          <Header currentPage='home' />
          <Container>
            <Row>
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