import { Report } from "./App";

export function getHoursG(timeSpent: number): string {
  let helpG = Math.floor(timeSpent / 3600);

  return helpG < 10 ? ('0' + helpG).slice(-2) : helpG.toString();
}

export function getMinutesG(timeSpent: number): string {
  return ('0' + Math.floor(timeSpent / 60)).slice(-2);
}

export function getSecondsG(timeSpent: number): string {
  return ('0' + Math.floor(timeSpent % 60)).slice(-2);
}

/* 
  Difference in seconds between 2 dates.
*/
export function calculateDiff(report: Report): number {
  return (new Date(report.updatedAt).getTime() - new Date(report.createdAt).getTime()) / 1000;
}

export function totalTimeSpentToday(reports: Report[]): number {
  let total = 0;

  reports.forEach((report: Report) => {
    if (isToday(new Date(report.updatedAt))) {
      total += calculateDiff(report);
    }
  });

  return total;
}

export function isToday(someDate: Date): boolean {
  const today = new Date();
  
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear();
}