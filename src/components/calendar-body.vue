<template>
  <div class="calendar-body">
    
    <div class="weeks">
      <strong class="week"
              v-for="(week, index) in weekListCn"
              :key="index">
        {{ week }}
      </strong>
    </div>

    <div class="dates">
      
      <div class="dates-bg">
      
      </div>
      
      <div class="dates-events">
        <p v-for="(day, index) in currentDaysList" :key="index">{{day}}</p>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import moment from 'moment';
import constant from '../constant';
import {formatDate} from "../utils";

export default {
	name: 'calendar-body',
  data () {
	  return {
      weekListCn: [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ],
      MONTH_VIEW_ALL_DAYS: 6 * 7
    };
  },
  props: {
    currentMonth: {
      type: String,
      default: formatDate(new Date(), constant.FORMAT_YEAR_MONTH)
    },
    weekFirstDay: {
      type: Number,
      default: 1
    }
  },
  computed: {
    currentDaysList() {
      return this.getMonthViewDaysRange();
    }
  },
  methods: {
	  getMonthViewStartDiffDays (date) {
      let monthFirstDayWeek = date.day();
      monthFirstDayWeek = monthFirstDayWeek === 0 ? 7 : monthFirstDayWeek;
      return monthFirstDayWeek - this.$props.weekFirstDay;
    },
    getMonthViewDaysRange () {
      let date = moment(this.$props.currentMonth);
	    let startDiffDays = this.getMonthViewStartDiffDays(date);
	    let firstDay = formatDate(date.add(-startDiffDays, 'days'), this.$constant.FORMAT_YEAR_MONTH_DATE);
	    // let lastDay = formatDate(date.add(this.MONTH_VIEW_ALL_DAYS - 1, 'days'), this.$constant.FORMAT_YEAR_MONTH_DATE);
	    let daysRange = [];
	    for (let i = 0; i < this.MONTH_VIEW_ALL_DAYS; i++) {
	      daysRange.push(formatDate(moment(firstDay).add(i, 'days'), this.$constant.FORMAT_YEAR_MONTH_DATE));
      }
	    console.log('daysRange');
	    console.log(daysRange);
	    return daysRange;
	    // return [firstDay, lastDay];
    }
  },
  created () {
	 this.getMonthViewDaysRange();
  }
};
</script>

<style lang="scss" scoped>

</style>
