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
    return moveDate(date, "weeks", 1);
  }

  function oneMonthAhead(date) {
    return moveDate(date, "months", 1);
  }

  function oneYearAhead(date) {
    return moveDate(date, "years", 1);
  }

  function oneWeekBack(date) {
    return moveDate(date, "weeks", -1);
  }

  function oneMonthBack(date) {
    return moveDate(date, "months", -1);
  }

  function oneYearBack(date) {
    return moveDate(date, "years", -1);
  }

  function moveDate(date, period, displacement) {
    return moment(date).add(displacement, period)
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
    firstDayOfWeek: dateOf(firstDayOfWeek),
    lastDayOfWeek: dateOf(lastDayOfWeek),
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