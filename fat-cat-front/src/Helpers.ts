import { Report } from "./App";

export function getHoursG(timeSpent: number): string {
  let helpG = Math.floor(timeSpent / 60);

  return helpG < 10 ? ('0' + helpG).slice(-2) : helpG.toString();
}

export function getMinutesG(timeSpent: number): string {
  return ('0' + Math.floor(timeSpent % 60)).slice(-2);
}

export function calculateDiff(report: Report): number {
  return new Date(report.updatedAt).getTime() - new Date(report.createdAt).getTime();
}