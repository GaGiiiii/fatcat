import { Report, User } from "./App";

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

export function validateEmail(email: String): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function isLoggedIn(api: String): User | null {
  let userLS = localStorage.getItem('user');

  if (userLS === null) {
    return null;
  }

  let parsedUser = JSON.parse(userLS);

  let user: User = {
    id: parsedUser.id,
    fullname: parsedUser.fullname,
    email: parsedUser.email,
    token: parsedUser.token,
  }

  return user || null;
}

export function logout() {
  localStorage.removeItem("user");
}

export function login(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}