import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import hero from '../../images/hero.png'; // with import
import heroActive from '../../images/hero-active.png'; // with import
import { TimerContext } from '../../App';
import { FaArrowLeft } from "react-icons/fa";
import './header.css';
import { Link } from 'react-router-dom';

interface Props {
  currentPage: string
}

export const Header: React.FC<Props> = ({ currentPage }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const TimerContextVar = useContext(TimerContext);

  /* Clock */
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
      <div style={{ position: 'relative' }}>
        {currentPage === 'reports' && <div className="arrow-back">
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>}
        <img className='w-100' src={TimerContextVar.clockActive ? heroActive : hero} alt="" />
      </div>
      <Container className='mt-5'>
        <div>
          <span className='fw-bold'>{currentDate.toLocaleDateString('en-US', { weekday: 'long' })} </span>
          <span className='text-muted'>{`${currentDate.getDate()} ${currentDate.toLocaleDateString('en-US', { month: 'short' })}, ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}`}</span>
        </div>
      </Container>
    </>
  )
}
