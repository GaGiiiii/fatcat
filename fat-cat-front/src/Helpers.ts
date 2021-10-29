export function getHoursG(timeSpent: number): string {
  return ('0' + Math.floor(timeSpent / 60)).slice(-2);
}

export function getMinutesG(timeSpent: number): string {
  return ('0' + Math.floor(timeSpent % 60)).slice(-2);
}