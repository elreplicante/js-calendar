'use strict';

var dateManipulations = (function() {
  var DAYS = "days",
    YEARS = "years",
    MONTHS = "months",
    WEEKS = "weeks";

  return {
    oneWeekAheadOf: dateOf(ahead(1, WEEKS)),
    oneMonthAheadOf: dateOf(ahead(1, MONTHS)),
    oneYearAheadOf: dateOf(ahead(1, YEARS)),
    oneWeekBackFrom: dateOf(back(1, WEEKS)),
    oneMonthBackFrom: dateOf(back(1, MONTHS)),
    oneYearBackFrom: dateOf(back(1, YEARS)),
    monthPeriodContaining: monthPeriodContaining,
    yearPeriodContaining: yearPeriodContaining,
    weekPeriodContaining: weekPeriodContaining
  };

  function firstDayOfYear(date) {
    return moment(date).dayOfYear(1);
  }

  function lastDayOfYear(date) {
    return firstDayOfYear(date).add(1, YEARS).add(-1, DAYS);
  }

  function firstDayOfWeek(date) {
    return moment(date).day("Monday");
  }

  function lastDayOfWeek(date) {
    return firstDayOfWeek(date).add(6, DAYS);
  }

  function firstDayOfMonth(date) {
    return moment(date).date(1);
  }

  function lastDayOfMonth(date) {
    var daysInMonth = moment(date).daysInMonth();
    return firstDayOfMonth(date).add(daysInMonth - 1, DAYS);
  }

  function ahead(num, period) {
    return function(date) {
      return moment(date).add(num, period);
    };
  }

  function back(num, period) {
    return function(date) {
      return moment(date).add(-num, period);
    };
  }

  function dateOf(fn) {
    return function(date) {
      return fn(date).toDate();
    };
  }

  function monthPeriodContaining(date) {
    return {
      startDate: firstDayOfMonth(date).toDate(),
      endDate: lastDayOfMonth(date).toDate()
    };
  }

  function yearPeriodContaining(date) {
    return {
      startDate: firstDayOfYear(date).toDate(),
      endDate: lastDayOfYear(date).toDate()
    };
  }

  function weekPeriodContaining(date) {
    return {
      startDate: firstDayOfWeek(date).toDate(),
      endDate: lastDayOfWeek(date).toDate()
    };
  }
})();