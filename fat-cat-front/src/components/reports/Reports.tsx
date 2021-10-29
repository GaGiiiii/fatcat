import React from 'react'
import { Container } from 'react-bootstrap';
import { Report } from '../../App';
import { Header } from '../header/Header';
import './reports.css';

interface Props {
  reports: Report[],
}

function calculateDiff(report: Report): number {
  return report.finished_at.getTime() - report.created_at.getTime();
}

const Reports: React.FC<Props> = ({ reports }) => {
  return (
    <>
      <Header currentPage={`reports`} />
      <Container>
        <h4 className='text-center text-uppercase my-5' style={{ letterSpacing: 4 }}>Reports</h4>
        <div className='report-table'>
          <div className='report-items'>
            {reports && reports.map(report => (
              <div key={report.id} className='report-item text-muted'>
                <span className='start-end'>{`${('0' + report.created_at.getHours()).slice(-2)}:${('0' + report.created_at.getMinutes()).slice(-2)} - ${('0' + report.finished_at.getHours()).slice(-2)}:${('0' + report.finished_at.getMinutes()).slice(-2)}`}</span>
                <span className='diff'>{calculateDiff(report)}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Reports;
