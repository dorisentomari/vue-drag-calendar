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
             v-for="(week, index) in currentWeeksDaysList"
             :key="index"
        >
          <div class="day-cell"
               v-for="(day, i) in week"
               :id="day.isToday ? 'today': ''"
               :key="i"
               :class="{
                  'current-month': day.isCurrentMonth,
                  'not-current-month': !day.isCurrentMonth,
                  'next-month': day.isNextMonth,
                  'previous-month': day.isPreviousMonth,
                  'selected': day.isSelected,
                  'clicked': day.isClicked
                 }
               "
               @click.stop="onClickDay(day, week, i, currentWeeksDaysList)"
               @mouseenter="onMouseEnter(day, week, i, currentWeeksDaysList)"
               @mouseleave="onMouseLeave(day, week, i, currentWeeksDaysList)"
               @drop.stop="onDrop(day, $event)"
               @dropover.stop="onDropOver(day, $event)"
               @dropenter.stop="onDropEnter(day, $event)"
               @dropleave.stop="onDropLeave(day, $event)"
          >
            <div class="day-number">
              <span>{{day.dayNumber}}</span>
            </div>
            <div class="events">
               <span v-for="(event, idx) in day.events.slice(0, everyDayMaxCount)"
                     class="event"
                     :draggable="enableDragDrop"
                     :key="event.id || idx"
                     @click.stop="onClickEvent(event, day)"
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
                    @click.stop="handleShowMore(day)"
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
        },
        currentDaysList: [],
        currentWeeksList: [],
        currentWeeksDaysList: [],
      };
    },
    watch: {
      currentMonth: {
        deep: true,
        immediate: true,
        handler() {
          return this.initCurrentDataList();
        }
      }
    },
    methods: {
      initCurrentDataList() {
        this.currentDaysList = this.getMonthViewDaysRange();
        this.currentWeeksList = this.getCurrentWeeksList();
        this.currentWeeksDaysList = this.getCurrentWeeksDaysList();
      },
      initWeekFirstDay () {
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
      },
      initShowMoreTitle () {
        let {locale} = this.$props;
        this.showMoreTitle = this.showMoreMap[locale];
      },
      getCurrentWeeksList() {
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
      getCurrentWeeksDaysList() {
        return this.currentWeeksList.map((weeks, index) => {
          return weeks.map((day, i) => {
            let _day = day;
            day = {};
            day.index = index * this.ONE_WEEK_DAYS + i;
            day.date = _day;
            day.dayNumber = day.date.substring(_day.length - 2);
            day.isToday = isToday(_day);
            day.isSelected = false;
            day.isClicked = false;
            day.isCurrentMonth = isCurrentMonth(this.currentMonth, _day);
            day.isPreviousMonth = isPreviousMonth(this.currentMonth, _day);
            day.isNextMonth = isNextMonth(this.currentMonth, _day);
            day.events = [];
            return day
          });
        });
      },
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
      selectCrossDays (currentDay, currentWeeksDaysList, fillColor = true) {
        for(let i = 0; i < this.MONTH_VIEW_ALL_DAYS; i++) {
          let day = currentDay.index % this.ONE_WEEK_DAYS;
          if((i - day) % this.ONE_WEEK_DAYS === 0) {
            currentWeeksDaysList.map(week => {
              return week.map(day => {
                if (i === day.index) {
                  day.isSelected = fillColor;
                }
                return day;
              });
            });
          }
        }
      },
      onClickDay(currentDay, currentWeek, index, currentWeeksDaysList) {
        this.currentWeeksDaysList.map(weeks => {
          return weeks.map(day => {
            day.isClicked = false;
            return day;
          });
        });
        
        this.selectCrossDays(currentDay, currentWeeksDaysList, true);
        
        currentDay.isClicked = true;
        this.$emit('on-click-day', currentDay, currentWeek);
      },
      onMouseEnter(currentDay, currentWeek, index, currentWeeksDaysList) {
        this.selectCrossDays(currentDay, currentWeeksDaysList, true);
        
        currentWeek.map(day => {
          if (!day.isClicked) {
            day.isSelected = true;
          }
          return day;
        });
      },
      onMouseLeave(currentDay, currentWeek, index, currentWeeksDaysList) {
        this.selectCrossDays(currentDay, currentWeeksDaysList, false);
        
        currentWeek.map(day => {
          day.isSelected = false;
          return day;
        });
      },
      onClickEvent(event, day) {
        this.$emit('on-click-event', event, day);
      },
      onDrop(day, $event) {
      },
      onDropOver(day, $event) {
      },
      onDropEnter(day, $event) {
      },
      onDropLeave(day, $event) {
      },
      handleShowMore(day) {
        // showMore 使用的时候，可以采用 UI 组件的 Modal 框，以展示更多的数据，或者做 AJAX 请求后再显示更多
        console.log('show more thing');
      }
    },
    created() {
      this.initCurrentDataList();
      this.initWeekFirstDay();
      this.initShowMoreTitle();
    }
  };
</script>
