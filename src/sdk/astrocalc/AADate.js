// DT

import ss from '../scriptsharp/ss';

export function DT() {
  this.m_dblJulian = 0;
  this.m_bGregorianCalendar = false;
  this.m_dblJulian = 0;
  this.m_bGregorianCalendar = false;
}
DT.create = function(Year, Month, Day, bGregorianCalendar) {
  const item = new DT();
  item.set(Year, Month, Day, 0, 0, 0, bGregorianCalendar);
  return item;
};
DT.createHMS = function(Year, Month, Day, Hour, Minute, Second, bGregorianCalendar) {
  const item = new DT();
  item.set(Year, Month, Day, Hour, Minute, Second, bGregorianCalendar);
  return item;
};
DT.createJD = function(JD, bGregorianCalendar) {
  const item = new DT();
  item.setJD(JD, bGregorianCalendar);
  return item;
};
DT.dateToJD = function(Year, Month, Day, bGregorianCalendar) {
  let Y = Year;
  let M = Month;
  if (M < 3) {
    Y = Y - 1;
    M = M + 12;
  }
  let A = 0;
  let B = 0;
  if (bGregorianCalendar) {
    A = ss.truncate((Y / 100));
    B = 2 - A + ss.truncate((A / 4));
  }
  return ss.truncate((365.25 * (Y + 4716))) + ss.truncate((30.6001 * (M + 1))) + Day + B - 1524.5;
};
DT.isLeap = function(Year, bGregorianCalendar) {
  if (bGregorianCalendar) {
    if (!(Year % 100)) {
      return (!(Year % 400)) ? true : false;
    }
    else {
      return (!(Year % 4)) ? true : false;
    }
  }
  else {
    return (!(Year % 4)) ? true : false;
  }
};
DT.afterPapalReform = function(Year, Month, Day) {
  return ((Year > 1582) || ((Year === 1582) && (Month > 10)) || ((Year === 1582) && (Month === 10) && (Day >= 15)));
};
DT.afterPapalReformJD = function(JD) {
  return (JD >= 2299160.5);
};
DT.dayOfYearJD = function(JD, Year, bGregorianCalendar) {
  return JD - DT.dateToJD(Year, 1, 1, bGregorianCalendar) + 1;
};
DT.daysInMonthForMonth = function(Month, bLeap) {
  console.assert(Month >= 1 && Month <= 12);
  const MonthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 0];
  if (bLeap) {
    MonthLength[1]++;
  }
  return MonthLength[Month - 1];
};
DT.INT = function(vvalue) {
  if (vvalue >= 0) {
    return ss.truncate(vvalue);
  }
  else {
    return ss.truncate((vvalue - 1));
  }
};
DT.prototype = {
  julian: function () {
    return this.m_dblJulian;
  },
  day: function () {
    const D = this.get();
    return ss.truncate(D[2]);
  },
  month: function () {
    const D = this.get();
    return ss.truncate(D[1]);
  },
  year: function () {
    const D = this.get();
    return ss.truncate(D[0]);
  },
  hour: function () {
    const D = this.get();
    return ss.truncate(D[3]);
  },
  minute: function () {
    const D = this.get();
    return ss.truncate(D[4]);
  },
  second: function () {
    const D = this.get();
    return ss.truncate(D[5]);
  },
  set: function (Year, Month, Day, Hour, Minute, Second, bGregorianCalendar) {
    const dblDay = Day + (Hour / 24) + (Minute / 1440) + (Second / 86400);
    this.setJD(DT.dateToJD(Year, Month, dblDay, bGregorianCalendar), bGregorianCalendar);
  },
  setJD: function (JD, bGregorianCalendar) {
    this.m_dblJulian = JD;
    this.setInGregorianCalendar(bGregorianCalendar);
  },
  setInGregorianCalendar: function (bGregorianCalendar) {
    const bAfterPapalReform = (this.m_dblJulian >= 2299160.5);
    this.m_bGregorianCalendar = bGregorianCalendar && bAfterPapalReform;
  },
  get: function () {
    let Year;
    let Month;
    let Day;
    let Hour;
    let Minute;
    let Second;
    const JD = this.m_dblJulian + 0.5;
    let tempZ = Math.floor(JD);
    let F = JD - tempZ;
    const Z = ss.truncate(tempZ);
    let A;
    if (this.m_bGregorianCalendar) {
      const alpha = ss.truncate(((Z - 1867216.25) / 36524.25));
      A = Z + 1 + alpha - ss.truncate((alpha / 4));
    } else {
      A = Z;
    }
    const B = A + 1524;
    const C = ss.truncate(((B - 122.1) / 365.25));
    const D = ss.truncate((365.25 * C));
    const E = ss.truncate(((B - D) / 30.6001));
    const dblDay = B - D - ss.truncate((30.6001 * E)) + F;
    Day = ss.truncate(dblDay);
    if (E < 14) {
      Month = E - 1;
    } else {
      Month = E - 13;
    }
    if (Month > 2) {
      Year = C - 4716;
    } else {
      Year = C - 4715;
    }
    tempZ = Math.floor(dblDay);
    F = dblDay - tempZ;
    Hour = ss.truncate((F * 24));
    Minute = ss.truncate(((F - Hour / 24) * 1440));
    Second = (F - (Hour / 24) - (Minute / 1440)) * 86400;
    return [Year, Month, Day, Hour, Minute, Second];
  },
  dayOfWeek: function () {
    return (ss.truncate((this.m_dblJulian + 1.5)) % 7);
  },
  dayOfYear: function () {
    const year = ss.truncate(this.get()[0]);
    return DT.dayOfYearJD(this.m_dblJulian, year, DT.afterPapalReform(year, 1, 1));
  },
  daysInMonth: function () {
    const D = this.get();
    const Year = ss.truncate(D[0]);
    const Month = ss.truncate(D[1]);
    return DT.daysInMonthForMonth(Month, DT.isLeap(Year, this.m_bGregorianCalendar));
  },
  daysInYear: function () {
    const D = this.get();
    const Year = ss.truncate(D[0]);
    if (DT.isLeap(Year, this.m_bGregorianCalendar)) {
      return 366;
    } else {
      return 365;
    }
  },
  leap: function () {
    return DT.isLeap(this.year(), this.m_bGregorianCalendar);
  },
  inGregorianCalendar: function () {
    return this.m_bGregorianCalendar;
  },
  fractionalYear: function () {
    const D = this.get();
    const Year = ss.truncate(D[0]);
    const Month = ss.truncate(D[1]);
    const Day = ss.truncate(D[2]);
    const Hour = ss.truncate(D[3]);
    const Minute = ss.truncate(D[4]);
    const Second = D[5];
    let DaysInYear;
    if (DT.isLeap(Year, this.m_bGregorianCalendar)) {
      DaysInYear = 366;
    } else {
      DaysInYear = 365;
    }
    return Year + ((this.m_dblJulian - DT.dateToJD(Year, 1, 1, DT.afterPapalReform(Year, 1, 1))) / DaysInYear);
  }
};



export function CalD() {
  this.year = 0;
  this.month = 0;
  this.day = 0;
  this.year = 0;
  this.month = 0;
  this.day = 0;
}
CalD.create = function(year, month, day) {
  const item = new CalD();
  item.year = year;
  item.month = month;
  item.day = day;
  return item;
};
export const CalD$ = {};


