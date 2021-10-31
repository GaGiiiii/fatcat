import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import hero from '../../images/hero.png'; // with import
import heroActive from '../../images/hero-active.png'; // with import
import { CurrentUserContext, TimerContext } from '../../App';
import { FaArrowLeft } from "react-icons/fa";
import './header.css';
import { Link } from 'react-router-dom';
import { GiExitDoor } from 'react-icons/gi';
import { logout } from '../../Helpers';
import { useHistory } from 'react-router-dom';

interface Props {
  currentPage: string
}

export const Header: React.FC<Props> = ({ currentPage }) => {
  let history = useHistory();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const TimerContextVar = useContext(TimerContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  /* Clock */
  useEffect(() => {
    let intervalIDParam: number = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // 1 second * 60 = 1 minute We need to lower this to seconds if we want perfect Sync!!!
    return () => {
      clearInterval(intervalIDParam);
    }
  }, []);

  function handleLogout() {
    logout();
    setCurrentUser!(null);
    history.push('/login');
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        {currentPage === 'reports' && <div className="arrow-back">
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>}
        <div className='logout-doors' onClick={handleLogout}>
          <GiExitDoor />
          {/* HERE WE CAN PUT SIGN OUT TEXT BUT DOORS ARE CUTER :) */}
        </div>
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
