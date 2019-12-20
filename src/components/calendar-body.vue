<template>
  <div class="calendar-body">
    
    <div class="weeks">
      <strong class="week"
              v-for="(week, index) in weekList"
              :key="index">
        {{ week }}
      </strong>
    </div>
    
    <div class="dates">
      
      <div class="dates-bg">
        <div class="weeks-row"
             v-for="(week, index) in currentDayEvents"
             :key="index"
        >
          <div class="day-cell"
               v-for="(day, i) in week"
               :key="i"
               :class="{
                  today: day.isToday,
                  'current-month': day.isCurrentMonth,
                  'not-current-month': !day.isCurrentMonth,
                  'next-month': day.isNextMonth,
                  'previous-month': day.isPreviousMonth,
                  selected: day.isSelected
                 }
               "
               @click="onClickDay(day, i)"
               @drop.prevent="onDrop(day, $event)"
               @dropover.prevent="onDropOver(day, $event)"
               @dropenter.prevent="onDropEnter(day, $event)"
               @dropleave.prevent="onDropLeave(day, $event)"
          >
            <div class="day-number">
              <span>{{day.dayNumber}}</span>
            </div>
            <div class="events">
               <span v-for="(event, idx) in day.events.slice(0, everyDayMaxCount)"
                     class="event"
                     :draggable="enableDragDrop"
                     :key="event.id || idx"
               >
                 <span class="badge"
                       :class="[event.status ? event.status : 'default']">
                 </span>
                 <span class="content">
                   {{event.name}}
                 </span>
              </span>
              <span v-if="day.events.length > everyDayMaxCount"
                    class="event"
                @click="handleShowMore(day)"
              >
                {{ showMoreTitle }}
              </span>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  
  </div>
</template>

<script>
  import moment from 'moment';
  import constant from './constant';
  import {formatDate, isCurrentMonth, isPreviousMonth, isNextMonth, isToday} from './utils';
  
  export default {
    name: 'calendar-body',
    data() {
      return {
        weekList: [],
        weekSunday: {id: 'SUNDAY', value: 7, EN: 'SUNDAY', CN: '星期日'},
        weekListMap: [
          {id: 'MONDAY', value: 1, EN: 'MONDAY', CN: '星期一'},
          {id: 'TUESDAY', value: 2, EN: 'TUESDAY', CN: '星期二'},
          {id: 'WEDNESDAY', value: 3, EN: 'WEDNESDAY', CN: '星期三'},
          {id: 'THURSDAY', value: 4, EN: 'THURSDAY', CN: '星期四'},
          {id: 'FRIDAY', value: 5, EN: 'FRIDAY', CN: '星期五'},
          {id: 'SATURDAY', value: 6, EN: 'SATURDAY', CN: '星期六'},
        ],
        ONE_WEEK_DAYS: 7,
        MONTH_VIEW_ALL_DAYS: 6 * 7,
        showMoreTitle: '',
        showMoreMap: {
          EN: 'show more',
          CN: '查看更多'
        }
      };
    },
    props: {
      currentMonth: {
        type: String,
        default: formatDate(new Date(), constant.FORMAT_YEAR_MONTH)
      },
      weekFirstDay: {
        type: Number,
        default: constant.WEEK_FIRST_DAY.MONDAY
      },
      locale: {
        type: String,
        default: constant.LOCALE.CN
      },
      events: {
        type: Array,
        default: () => ([])
      },
      enableDragDrop: {
        type: Boolean,
        default: false
      },
      everyDayMaxCount: {
        type: Number,
        default: constant.EVERY_DAY_MAX_COUNT
      }
    },
    computed: {
      currentDaysList() {
        return this.getMonthViewDaysRange();
      },
      currentWeekDaysList() {
        let list = [];
        let weeks = [];
        for (let i = 0; i <= this.MONTH_VIEW_ALL_DAYS; i++) {
          if (i !== 0 && i % this.ONE_WEEK_DAYS === 0) {
            list.push(weeks);
            weeks = [];
          }
          weeks.push(this.currentDaysList[i]);
        }
        return list;
      },
      currentDayEvents() {
        let list = [];
        let _day = {};
        const events = this.$props.events;
        let eventsDateKeys = events.map(event => event.date);
        
        let res = {};
        eventsDateKeys.forEach(date => {
          res[date] = events.filter(event => event.date === date);
        });
        this.currentWeekDaysList.forEach(weeks => {
          let w = [];
          weeks.forEach(day => {
            _day.date = day;
            _day.dayNumber = day.substring(day.length - 2);
            _day.isToday = isToday(day);
            _day.isSelected = false;
            _day.isCurrentMonth = isCurrentMonth(this.currentMonth, day);
            _day.isPreviousMonth = isPreviousMonth(this.currentMonth, day);
            _day.isNextMonth = isNextMonth(this.currentMonth, day);
            _day.events = events.filter(event => event.date === day);
            w.push(_day);
            _day = {};
          });
          list.push(w);
          w = [];
        });
        return list;
      }
    },
    methods: {
      getMonthViewStartDiffDays(date) {
        let monthFirstDayWeek = date.day();
        monthFirstDayWeek = monthFirstDayWeek === 0 ? this.ONE_WEEK_DAYS : monthFirstDayWeek;
        return monthFirstDayWeek - this.$props.weekFirstDay;
      },
      getMonthViewDaysRange() {
        let date = moment(this.$props.currentMonth);
        let startDiffDays = this.getMonthViewStartDiffDays(date);
        let firstDay = formatDate(date.add(-startDiffDays, constant.MOMENT.DAYS), constant.FORMAT_YEAR_MONTH_DATE);
        let daysRange = [];
        for (let i = 0; i < this.MONTH_VIEW_ALL_DAYS; i++) {
          daysRange.push(formatDate(moment(firstDay).add(i, constant.MOMENT.DAYS), constant.FORMAT_YEAR_MONTH_DATE));
        }
        return daysRange;
      },
      onClickDay(day, i) {
        this.$emit('click-day', day);
      },
      handleDragEvent() {
        return this.$props.enableDragDrop;
      },
      onDrop(day, $event) {
        this.handleDragEvent();
      },
      onDropOver(day, $event) {
      
      },
      onDropEnter(day, $event) {
      
      },
      onDropLeave(day, $event) {
      
      },
      handleShowMore(day) {
        // showMore 使用的时候，可以采用 UI 组件的 Modal 框，以展示更多的数据，或者做 AJAX 请求后再显示更多
      }
    },
    created() {
      this.getMonthViewDaysRange();

      let {locale, weekFirstDay} = this.$props;
      
      switch (weekFirstDay) {
        case constant.WEEK_FIRST_DAY.MONDAY:
          this.weekListMap.push(this.weekSunday);
          break;
        case constant.WEEK_FIRST_DAY.SUNDAY:
          this.weekListMap.unshift(this.weekSunday);
          break;
        default:
          this.weekListMap.push(this.weekSunday);
          break;
      }
      this.weekList = this.weekListMap.map(day => day[locale]);
      this.showMoreTitle = this.showMoreMap[locale];
    }
  };
</script>
