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
           <ButtonGroup>
            <Button icon="ios-arrow-back" @click.stop="goPrevYear(prevTime)">上年</Button>
            <Button icon="ios-arrow-back" @click.stop="goPrevMonth(prevTime)">上个月</Button>
            <Button icon="ios-arrow-forward" @click.stop="goNextMonth(nextTime)">下个月</Button>
            <Button icon="ios-arrow-forward" @click.stop="goNextYear(nextTime)">下年</Button>
          </ButtonGroup>
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
import moment from 'moment';
import constant from '../constant';
import {formatDate} from "../utils";

export default {
	name: 'calendar-header',
  data () {
	  return {
	    prevTime: -1,
      nextTime: 1,
      CHANGE_MONTH: 'change-month',
      CHANGE_YEAR: 'change-year'
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
    goPrevMonth(value) {
      this.$emit(this.CHANGE_MONTH, value);
    },
    goNextMonth(value) {
      this.$emit(this.CHANGE_MONTH, value);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
