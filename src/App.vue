<template>
  <div id="app">
    <h3>vue-drag-calendar</h3>
    <Calendar class="calendar"
              :locale="locale"
              :week-first-day="weekFirstDay"
              :every-day-max-count="everyDayMaxCount"
              :events="events"
              @on-click-day="onClickDay"
              @on-click-event="onClickEvent"
    >
    </Calendar>
  </div>
</template>

<script>
  import Calendar from './components/calendar';
  import constant from './components/constant';
  
  export default {
    name: 'app',
    components: {
      Calendar
    },
    data() {
      return {
        locale: constant.LOCALE.CN,
        everyDayMaxCount: constant.EVERY_DAY_MAX_COUNT,
        weekFirstDay: constant.WEEK_FIRST_DAY.DEFAULT,
        events: [
          {id: 5, name: '测试05', date: '2019-12-04', status: 'success', draggable: true},
          {id: 7, name: '测试05', date: '2019-12-04', status: 'error', draggable: true},
          {id: 8, name: '测试05', date: '2019-12-04', status: 'warning', draggable: true},
          {id: 9, name: '测试05', date: '2019-12-04', status: 'success', draggable: true},
          {id: 10, name: '测试05', date: '2019-12-04', status: 'warning', draggable: true},
          {id: 11, name: '测试05', date: '2019-12-04', status: 'error', draggable: true},
          {id: 12, name: '测试05', date: '2019-12-04', status: 'success', draggable: true},
          {id: 13, name: '测试05', date: '2019-12-04', status: 'error', draggable: true},
          {id: 6, name: '测试06', date: '2019-12-07', status: 'warning', draggable: true},
          {id: 3, name: '测试03', date: '2019-12-18', status: 'error', draggable: true},
          {id: 1, name: '测试01', date: '2019-12-19', status: 'success', draggable: true},
          {id: 2, name: '测试02', date: '2019-12-20', status: 'error', draggable: true},
          {id: 4, name: '测试04', date: '2019-11-28', status: 'error', draggable: true},
          {id: 14, name: '测试04', date: '2019-11-08', status: 'error', draggable: true},
          {id: 15, name: '测试04', date: '2019-11-24', status: 'error', draggable: true},
          {id: 16, name: '测试04', date: '2019-11-12', status: 'error', draggable: true},
          {id: 17, name: '测试04', date: '2019-10-11', status: 'error', draggable: true},
        ]
      };
    },
    methods: {
      onClickDay(...args) {
        console.log('onClickDay', args);
      },
      onClickEvent(...args) {
        console.log('onClickEvent', args);
      }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    background: #fff;
    height: 2000px;
  }
  
  h3 {
    text-align: center;
    font-size: 28px;
    padding: 1rem 0;
  }
  
  .calendar {
    width: 1400px;
    margin: 0 auto;
  }

</style>
