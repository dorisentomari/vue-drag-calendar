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
