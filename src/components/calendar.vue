<template>
  <div class="drag-calendar">
    <CalendarHeader
      @on-change-month="changeMonth"
      @on-change-year="changeYear"
      @on-current-month="changeCurrentMonth"
      :current-month="currentMonth"
      :week-first-day="weekFirstDay"
    >
      <div class="header-left">
        <slot name="header-left"></slot>
      </div>
      
      <div class="header-center">
        <slot name="header-center"></slot>
      </div>
      
      <div class="header-right">
        <slot name="header-right"></slot>
      </div>
    
    </CalendarHeader>
    
    <CalendarBody
      :current-month="currentMonth"
      :locale="locale"
      :week-first-day="weekFirstDay"
      :every-day-max-count="everyDayMaxCount"
      :events="events"
      @on-click-day="onClickDay"
      @on-click-event="onClickEvent"
    >
      <slot name="events"></slot>
    </CalendarBody>
  </div>
</template>

<script>
  import moment from 'moment';
  import constant from './constant';
  import './drag-calendar.scss';
  
  import CalendarHeader from './calendar-header';
  import CalendarBody from './calendar-body';
  
  import {formatDate} from './utils';
  
  const currentMonth = formatDate(new Date(), constant.FORMAT_YEAR_MONTH);
  
  export default {
    name: 'calendar',
    props: {
      locale: {
        type: String,
        default: constant.LOCALE.CN,
        validator(value) {
          let { CN, EN } = constant.LOCALE;
          if (value !== CN && value !== EN) {
            console.error(`locale must be ${CN} or ${EN}，your data is ${value}`);
            return false;
          }
          return true;
        }
      },
      events: {
        type: Array,
        default: () => ([])
      },
      everyDayMaxCount: {
        type: Number,
        default: constant.EVERY_DAY_MAX_COUNT,
        validator(value) {
          if (value !== (value | 0) || value < 1) {
            console.error(`everyDayMaxCount must be natural number，your data is ${value}`);
            return false;
          }
          return true;
        }
      },
      weekFirstDay: {
        type: Number,
        default: constant.WEEK_FIRST_DAY.DEFAULT,
        validator(value) {
          let { MONDAY, SUNDAY } = constant.WEEK_FIRST_DAY;
          if (value !== MONDAY && value !== SUNDAY) {
            console.error(`weekFirstDay must be ${MONDAY} or ${SUNDAY}，your data is ${value}`);
            return false;
          }
          return true;
        }
      }
    },
    data() {
      return {
        currentMonth: currentMonth
      };
    },
    components: {
      CalendarHeader,
      CalendarBody
    },
    methods: {
      changeMonth(value) {
        this.changeToTargetMonth(value);
      },
      changeYear(value) {
        this.changeToTargetMonth(value, true);
      },
      changeToTargetMonth (value, isYear) {
        let currentDate = moment(this.currentMonth);
        if (isYear) {
          this.currentMonth = formatDate(currentDate.add(value, constant.MOMENT.YEARS),constant.FORMAT_YEAR_MONTH);
        } else {
          this.currentMonth = formatDate(currentDate.add(value, constant.MOMENT.MONTHS),constant.FORMAT_YEAR_MONTH);
        }
      },
      changeCurrentMonth () {
        this.currentMonth = currentMonth;
      },
      onClickDay (...args) {
        this.$emit('on-click-day', ...args);
      },
      onClickEvent (...args) {
        this.$emit('on-click-event', args);
      }
    }
  };
</script>
