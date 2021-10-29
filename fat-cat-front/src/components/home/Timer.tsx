import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { TimerContext } from '../../App';
import { getHoursG, getMinutesG } from '../../Helpers'

const Timer: React.FC = () => {
  const TimerContextVar = useContext(TimerContext);

  return (
    <div className='mt-5 text-center'>
      <Row className='justify-content-center'>
        <Col xs={'auto'}>
          <span className='timer'>{getHoursG(TimerContextVar.timeSpent !== undefined ? TimerContextVar.timeSpent : 0)}</span>
          <p className='fw-bold text-uppercase'>Hours</p>
        </Col>
        <Col xs={'auto'}>
          <span className='timer'>:</span>
        </Col>
        <Col xs={'auto'}>
          <span className='timer'>{getMinutesG(TimerContextVar.timeSpent !== undefined ? TimerContextVar.timeSpent : 0)}</span>
          <p className='fw-bold text-uppercase'>Minutes</p>
        </Col>
      </Row>
    </div>
  )
}

export default Timer;