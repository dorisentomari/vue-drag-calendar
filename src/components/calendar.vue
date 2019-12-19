<template>
  <div class="drag-calendar">
    <CalendarHeader
      @change-month="changeMonth"
      @change-year="changeYear"
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
      :week-first-day="weekFirstDay"
    >
    
    </CalendarBody>
    <More></More>
  </div>
</template>

<script>
  import moment from 'moment';
  
  import CalendarHeader from './calendar-header';
  import CalendarBody from './calendar-body';
  import More from './more';
  
  import {formatDate} from '../utils';
  
  export default {
    name: 'calendar',
    props: {
      locale: {
        type: String,
        default: 'zh-CN'
      }
    },
    data() {
      const d = '2019-10-01';
      console.log(d);
      return {
        currentMonth: formatDate(new Date(d), this.$constant.FORMAT_YEAR_MONTH),
        // 每周第一天是周日还是周一， 0 代表周日， 1 代表周一
        weekFirstDay: 1
      };
    },
    components: {
      CalendarHeader,
      CalendarBody,
      More
    },
    methods: {
      changeMonth(value) {
        this.changeCurrentMonth(value);
      },
      changeYear(value) {
        this.changeCurrentMonth(value, true);
      },
      changeCurrentMonth (value, flag) {
        let currentDate = moment(this.currentMonth);
        if (flag) {
          this.currentMonth = formatDate(currentDate.add(value, 'year'), this.$constant.FORMAT_YEAR_MONTH);
        } else {
          this.currentMonth = formatDate(currentDate.add(value, 'month'), this.$constant.FORMAT_YEAR_MONTH);
        }
        console.log(this.currentMonth);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
