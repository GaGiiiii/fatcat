import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import hero from '../../images/hero.png'; // with import
import './home.css';

function getHoursG(timeSpent: number): string {
  return ('0' + Math.floor(timeSpent / 60)).slice(-2);
}
function getMinutesG(timeSpent: number): string {
  return ('0' + Math.floor(timeSpent % 60)).slice(-2);
}

export default function Home(): JSX.Element {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [clockActive, setClockActive] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<number>(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);

  function handleClockIn(): void {
    if (!clockActive) {
      let intervalIDParam = window.setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 10);
      setIntervalID(intervalIDParam);
    } else {
      clearInterval(intervalID);
      setTotalTimeSpent(prev => prev + timeSpent);
      setTimeSpent(0);
    }
    setClockActive(prev => !prev);
  }

  useEffect(() => {
    let intervalIDParam: number = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // 1 second * 60 = 1 minute
    return () => {
      clearInterval(intervalIDParam);
    }
  }, []);

  return (
    <>
      <Container fluid className='g-0'>
        <Row>
          <Col>
            <div>
              <img className='w-100' src={hero} alt="" />
            </div>
            <Container>
              <Row className='mt-5'>
                <Col>
                  <div>
                    <span className='fw-bold'>{currentDate.toLocaleDateString('en-US', { weekday: 'long' })} </span>
                    <span className='text-muted'>{`${currentDate.getDate()} ${currentDate.toLocaleDateString('en-US', { month: 'short' })}, ${currentDate.getHours()}:${currentDate.getMinutes()}`}</span>
                  </div>
                  <div className="mt-3">
                    <h6 className='text-justify total-time'>Total time spent today: <span className='fw-bold'>{`${getHoursG(totalTimeSpent)}h ${getMinutesG(totalTimeSpent)}m`}</span></h6>
                  </div>
                  <div className='mt-5 text-center'>
                    <Row className='justify-content-center'>
                      <Col xs={'auto'}>
                        <span className='timer'>{getHoursG(timeSpent)}</span>
                        <p className='fw-bold text-uppercase'>Hours</p>
                      </Col>
                      <Col xs={'auto'}>
                        <span className='timer'>:</span>
                      </Col>
                      <Col xs={'auto'}>
                        <span className='timer'>{getMinutesG(timeSpent)}</span>
                        <p className='fw-bold text-uppercase'>Minutes</p>
                      </Col>
                    </Row>
                  </div>
                  <div className='mt-5'>
                    <Button className='w-100 reports-btn'>
                      Reports
                    </Button>
                    <Button className={`w-100 mt-3 clock-in-btn${clockActive ? ' active-clock' : ''}`} onClick={handleClockIn}>
                      Clock in
                    </Button>
                    <p className={`text-muted help-text mt-2${clockActive ? ' red' : ''}`}>Clicking <span className='text-uppercase fw-bold'>Clock in</span> button will start the time counter.</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}
