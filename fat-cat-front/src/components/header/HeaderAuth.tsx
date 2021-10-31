import React from 'react'
import './header.css';
import heroAuth from '../../images/login-hero.png'; // with import

export const HeaderAuth: React.FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <img className='w-100' src={heroAuth} alt="Couldn't load" />
      <h2 className='text-center text-uppercase fw-bold header-auth-h2'><span style={{ color: '#05c886' }}>Time</span> Track.</h2>
    </div>
  )
}
