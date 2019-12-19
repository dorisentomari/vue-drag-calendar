<template>
  <div id="app">
    <h3>vue-drag-calendar</h3>
    <Calendar></Calendar>
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
  h3 {
    text-align: center;
    font-size: 28px;
    padding: 1rem 0;
  }
</style>
