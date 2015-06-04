'use strict';

var dateManipulations = (function() {
  function firstDayOfYear(date) {
    return moment(date).dayOfYear(1);
  }

  function lastDayOfYear(date) {
    return firstDayOfYear(date).add(1, "years").add(-1, "days");
  }

  function firstDayOfWeek(date) {
    return moment(date).day("Monday");
  }

  function lastDayOfWeek(date) {
    return firstDayOfWeek(date).add(6, "days");
  }

  function firstDayOfMonth(date) {
    return moment(date).date(1);
  }

  function lastDayOfMonth(date) {
    var daysInMonth = moment(date).daysInMonth();
    return firstDayOfMonth(date).add(daysInMonth - 1, "days");
  }

  function oneWeekAhead(date) {
    return moment(date).add(1, "weeks");
  }

  function oneMonthAhead(date) {
    return moment(date).add(1, "months");
  }

  function oneYearAhead(date) {
    return moment(date).add(1, "years");
  }

  function oneWeekBack(date) {
    return moment(date).add(-1, "weeks");
  }

  function oneMonthBack(date) {
    return moment(date).add(-1, "months");
  }

  function oneYearBack(date) {
    return moment(date).add(-1, "years");
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

  return {
    oneWeekAheadOf: dateOf(oneWeekAhead),
    oneMonthAheadOf: dateOf(oneMonthAhead),
    oneYearAheadOf: dateOf(oneYearAhead),
    oneWeekBackFrom: dateOf(oneWeekBack),
    oneMonthBackFrom: dateOf(oneMonthBack),
    oneYearBackFrom: dateOf(oneYearBack),
    monthPeriodContaining: monthPeriodContaining,
    yearPeriodContaining: yearPeriodContaining,
    weekPeriodContaining: weekPeriodContaining
  };
})();