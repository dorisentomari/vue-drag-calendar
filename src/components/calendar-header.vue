<template>
  <div class="calendar-header">
    <div class="header-left">
      <slot name="header-left"></slot>
    </div>
  
    <div class="header-center">
      <slot name="header-center">
        
        <span class="left">
          <span class="title">
            {{ currentMonth }}
          </span>
        </span>
        
        <span class="right">
          <span class="btn-group">
            <button @click.stop="goPrevYear(prevTime)">上年</button>
            <button @click.stop="goPrevMonth(prevTime)">上个月</button>
            <button @click.stop="goCurrentMonth">{{ keepCurrentMonth }}</button>
            <button @click.stop="goNextMonth(nextTime)">下个月</button>
            <button @click.stop="goNextYear(nextTime)">下年</button>
          </span>
        </span>
        
      </slot>
    </div>
  
    <div class="header-right">
      <slot name="header-right"></slot>
    </div>
    
  </div>
</template>

<script>
  import constant from './constant';
  import {formatDate} from "./utils";
  
  const keepCurrentMonth = formatDate(new Date(), constant.FORMAT_YEAR_MONTH);
  
  export default {
    name: 'calendar-header',
    data() {
      return {
        prevTime: -1,
        nextTime: 1,
        CHANGE_MONTH: 'on-change-month',
        CHANGE_YEAR: 'on-change-year',
        CURRENT_MONTH: 'on-current-month',
        keepCurrentMonth: keepCurrentMonth
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
    methods: {
      goPrevYear(value) {
        this.$emit(this.CHANGE_YEAR, value);
      },
      goNextYear(value) {
        this.$emit(this.CHANGE_YEAR, value);
      },
      goCurrentMonth() {
        this.$emit(this.CURRENT_MONTH);
      },
      goPrevMonth(value) {
        this.$emit(this.CHANGE_MONTH, value);
      },
      goNextMonth(value) {
        this.$emit(this.CHANGE_MONTH, value);
      }
    }
  };
</script>
