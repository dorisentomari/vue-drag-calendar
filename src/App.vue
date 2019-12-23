<template>
  <div id="app">
    <h3>vue-drag-calendar</h3>
    <Calendar class="calendar"
              :locale="locale"
              :enable-drag-drop="enableDragDrop"
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
  data () {
    return {
      locale: constant.LOCALE.CN,
      everyDayMaxCount: constant.EVERY_DAY_MAX_COUNT,
      enableDragDrop: true,
      events: [
        { id: 5, name: '测试05', date: '2019-12-04', startTime: '15:30', endTime: '18:00', status: 'success' },
        { id: 7, name: '测试05', date: '2019-12-04', startTime: '15:30', endTime: '18:00', status: 'error' },
        { id: 8, name: '测试05', date: '2019-12-04', startTime: '15:30', endTime: '18:00', status: 'warning' },
        { id: 9, name: '测试05', date: '2019-12-04', startTime: '15:30', endTime: '18:00', status: 'success' },
        { id: 10, name: '测试05', date: '2019-12-04', startTime: '15:30', endTime: '18:00', status: 'warning' },
        { id: 11, name: '测试05', date: '2019-12-04', startTime: '15:30', endTime: '18:00', status: 'error' },
        { id: 12, name: '测试05', date: '2019-12-04', startTime: '15:30', endTime: '18:00', status: 'success' },
        { id: 13, name: '测试05', date: '2019-12-04', startTime: '15:30', endTime: '18:00', status: 'error' },
        { id: 6, name: '测试06', date: '2019-12-07', startTime: '15:30', endTime: '18:00', status: 'warning' },
        { id: 3, name: '测试03', date: '2019-12-18', startTime: '15:30', endTime: '18:00', status: 'error' },
        { id: 1, name: '测试01', date: '2019-12-19', startTime: '15:30', endTime: '18:00', status: 'success' },
        { id: 2, name: '测试02', date: '2019-12-20', startTime: '15:30', endTime: '18:00', status: 'error' },
        { id: 4, name: '测试04', date: '2019-11-28', startTime: '15:30', endTime: '18:00', status: 'error' },
        { id: 14, name: '测试04', date: '2019-11-08', startTime: '15:30', endTime: '18:00', status: 'error' },
        { id: 15, name: '测试04', date: '2019-11-24', startTime: '15:30', endTime: '18:00', status: 'error' },
        { id: 16, name: '测试04', date: '2019-11-12', startTime: '15:30', endTime: '18:00', status: 'error' },
        { id: 17, name: '测试04', date: '2019-10-11', startTime: '15:30', endTime: '18:00', status: 'error' },
      ]
    };
  },
  methods: {
    onClickDay(...args) {},
    onClickEvent (...args) {}
  },
  created () {
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
