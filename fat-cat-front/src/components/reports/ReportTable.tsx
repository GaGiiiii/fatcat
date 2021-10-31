import React, { useEffect, useState } from 'react'
import { Report } from '../../App'
import { getHoursG, getMinutesG } from '../../Helpers';
import ReportTableRow from './ReportTableRow';

interface Props {
  reports: Report[],
  forDate: Date,
}

const ReportTable: React.FC<Props> = ({ reports, forDate }) => {
  const [reportsToShow, setReportsToShow] = useState<Report[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);

  /* We Only Want To Show Reports For Selected Day */
  useEffect(() => {
    let helpG = [...reports];
    let dayG = forDate.getDate();
    let monthG = forDate.getMonth();
    let yearG = forDate.getFullYear();

    helpG = helpG.filter((report: Report) => new Date(report.createdAt).getDate() === dayG && new Date(report.createdAt).getMonth() === monthG && new Date(report.createdAt).getFullYear() === yearG);
    setReportsToShow(helpG);
  }, [reports, forDate]);

  return (
    <div className='mb-5'>
      <h6><span className='fw-bold'>Time report for {forDate.toLocaleDateString('en-US', { weekday: 'long' })},</span><span className='text-muted'> {`${forDate.getDate()} ${forDate.toLocaleDateString('en-US', { month: 'short' })}:`}</span></h6>
      {reportsToShow.length > 0 ? reportsToShow.map(report => (
        <ReportTableRow key={report.id} report={report} setTotalTime={setTotalTime} />
      )) : 'No reports for this day'}
      {reportsToShow.length > 0 && <h6 className='mt-2 fw-bold d-flex justify-content-between'><span>Total:</span><span>{`${getHoursG(totalTime)}h ${getMinutesG(totalTime)}m`}</span></h6>}
    </div>
  )
}

export default ReportTable;
