import React, { useContext, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import './home.css';
import Timer from './Timer';
import { getHoursG, getMinutesG } from '../../Helpers';
import { Header } from '../header/Header';
import { Link } from 'react-router-dom';
import { TimerContext } from '../../App';

const Home: React.FC = () => {
  const [reports, setReports] = useState([]);
  const TimerContextVar = useContext(TimerContext);

  function handleClockIn(): void {
    if (!TimerContextVar.clockActive) {
      let intervalIDParam = window.setInterval(() => {
        TimerContextVar.setTimeSpent!(prev => prev + 1);
      }, 10);
      TimerContextVar.setIntervalID!(intervalIDParam);
    } else {
      clearInterval(TimerContextVar.intervalID!);
      TimerContextVar.setTotalTimeSpent!(prev => prev + TimerContextVar.timeSpent!);
      TimerContextVar.setTimeSpent!(0);
    }
    TimerContextVar.setClockActive!(prev => !prev);
  }

  return (
    <Container fluid className='g-0'>
      <Row>
        <Col>
          <Header />
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