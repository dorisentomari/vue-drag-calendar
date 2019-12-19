<template>
  <div id="app">
    <h3>vue-drag-calendar</h3>
    <Calendar class="calendar"></Calendar>
  </div>
</template>

<script>
import Calendar from './components/calendar';

export default {
  name: 'app',
  components: {
    Calendar
  }
}
</script>

<style lang="scss" scoped>
  #app {
    background: #ccc;
  }
  h3 {
    text-align: center;
    font-size: 28px;
    padding: 1rem 0;
  }
  
  .calendar {
    width: 1000px;
    margin: 0 auto;
  }
  
</style>
