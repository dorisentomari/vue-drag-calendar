const INVALID_DATE = new Date('xxxx').toString();

export default  {
  FORMAT_YEAR: 'YYYY',
  FORMAT_YEAR_MONTH: 'YYYY-MM',
  FORMAT_YEAR_MONTH_DATE: 'YYYY-MM-DD',
  INVALID_DATE,
  LOCALE: {
    CN: 'CN',
    EN: 'EN'
  },
  WEEK_FIRST_DAY: {
    SUNDAY: 0,
    MONDAY: 1,
    DEFAULT: 1
  },
  EVERY_DAY_MAX_COUNT: 3,
  EVENT_STATUS: {
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    DEFAULT: 'DEFAULT'
  },
  MOMENT: {
    DAYS: 'days',
    MONTHS: 'months',
    YEARS: 'years'
  }
};
