import React, { useEffect, useMemo } from 'react'
import { Report } from '../../App'
import { calculateDiff, getHoursG, getMinutesG, getSecondsG } from '../../Helpers';

interface Props {
  report: Report,
  key: number,
  setTotalTime: React.Dispatch<React.SetStateAction<number>>,
}

const ReportTableRow: React.FC<Props> = ({ report, setTotalTime }) => {
  const diff = useMemo(() => calculateDiff(report), [report]);

  useEffect(() => {
    setTotalTime(prev => prev + diff);
  }, [diff, setTotalTime]);

  return (
    <div className='report-item text-muted'>
      <span className='start-end'>{`${('0' + new Date(report.createdAt).getHours()).slice(-2)}:${('0' + new Date(report.createdAt).getMinutes()).slice(-2)} - ${('0' + new Date(report.updatedAt).getHours()).slice(-2)}:${('0' + new Date(report.updatedAt).getMinutes()).slice(-2)}`}</span>
      <span className='diff'>{`${getHoursG(diff)}h ${getMinutesG(diff)}m (${getSecondsG(diff)}s)`}</span>
    </div>
  )
}

export default ReportTableRow;
