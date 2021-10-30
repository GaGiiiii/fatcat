import React from 'react'
import { Container } from 'react-bootstrap';
import { Report } from '../../App';
import { Header } from '../header/Header';
import './reports.css';
import ReportTable from './ReportTable';

interface Props {
  reports: Report[],
}

const Reports: React.FC<Props> = ({ reports }) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return (
    <>
      <Header currentPage={`reports`} />
      <Container>
        <h4 className='text-center text-uppercase my-5' style={{ letterSpacing: 4 }}>Reports</h4>
        <div className='report-table'>
          <div className='report-items'>
            <ReportTable reports={reports} forDate={today} />
            <ReportTable reports={reports} forDate={yesterday} />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Reports;
