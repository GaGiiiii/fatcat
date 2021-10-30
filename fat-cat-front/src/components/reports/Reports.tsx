import React from 'react'
import { Container } from 'react-bootstrap';
import { Report } from '../../App';
import { Header } from '../header/Header';
import './reports.css';
import { getHoursG, getMinutesG } from '../../Helpers'

interface Props {
  reports: Report[],
}

function calculateDiff(report: Report): number {
  return new Date(report.updatedAt).getTime() - new Date(report.createdAt).getTime();
}

const Reports: React.FC<Props> = ({ reports }) => {
  return (
    <>
      <Header currentPage={`reports`} />
      <Container>
        <h4 className='text-center text-uppercase my-5' style={{ letterSpacing: 4 }}>Reports</h4>
        <div className='report-table'>
          <div className='report-items'>
            {reports.length > 0 && console.log(new Date(reports[0].createdAt))}
            {reports.length > 0 && reports.map(report => (
              <div key={report.id} className='report-item text-muted'>
                <span className='start-end'>{`${('0' + new Date(report.createdAt).getHours()).slice(-2)}:${('0' + new Date(report.createdAt).getMinutes()).slice(-2)} - ${('0' + new Date(report.updatedAt).getHours()).slice(-2)}:${('0' + new Date(report.updatedAt).getMinutes()).slice(-2)}`}</span>
                <span className='diff'>{`${getHoursG(calculateDiff(report))}h ${getMinutesG(calculateDiff(report))}m`}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Reports;
