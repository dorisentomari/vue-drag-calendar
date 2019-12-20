import momemt from 'moment';

import constant from './constant';

const {INVALID_DATE, FORMAT_YEAR, FORMAT_YEAR_MONTH, FORMAT_YEAR_MONTH_DATE} = constant;

export const formatDate = (time, format) => {

  if (new Date(time).toString() === INVALID_DATE) {
    time = new Date();
  }
  switch (format) {
    case FORMAT_YEAR:
      return momemt(time).format(FORMAT_YEAR);

    case FORMAT_YEAR_MONTH:
      return momemt(time).format(FORMAT_YEAR_MONTH);

    case FORMAT_YEAR_MONTH_DATE:
      return momemt(time).format(FORMAT_YEAR_MONTH_DATE);
    default:
      return momemt(time).format(FORMAT_YEAR_MONTH_DATE);
  }
};

export const getCurrentMonth = date => {
  let currentDate = formatDate(momemt(new Date()), FORMAT_YEAR_MONTH);
  let newDate = formatDate(momemt(date), FORMAT_YEAR_MONTH);
  return [currentDate, newDate];
};

export const isCurrentMonth = (date) => {
  let [currentDate, newDate] = getCurrentMonth(date);
  return currentDate === newDate;
};

export const isPreviousMonth = date => {
  let [currentDate, newDate] = getCurrentMonth(date);
  return currentDate > newDate;
};

export const isNextMonth = date => {
  let [currentDate, newDate] = getCurrentMonth(date);
  return currentDate < newDate;
};

export const getCurrentDay = date => {
  let currentDay = formatDate(momemt(new Date()), FORMAT_YEAR_MONTH_DATE);
  let newDay = formatDate(momemt(date), FORMAT_YEAR_MONTH_DATE);
  return [currentDay, newDay];
};

export const isToday = date => {
  let [currentDay, newDay] = getCurrentDay(date);
  return currentDay === newDay;
};

