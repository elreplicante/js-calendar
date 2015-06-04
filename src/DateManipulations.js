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

  function forwardOneWeek(date) {
    return moveDate(date, "weeks", 1);
  }

  function forwardOneMonth(date) {
    return moveDate(date, "months", 1);
  }

  function forwardOneYear(date) {
    return moveDate(date, "years", 1);
  }

  function backwardOneWeek(date) {
    return moveDate(date, "weeks", -1);
  }

  function moveDate(date, period, displacement) {
    return moment(date).add(displacement, period)
  }

  function dateOf(fn) {
    return function(date) {
      return fn(date).toDate();
    };
  }

  return {
    firstDayOfYear: dateOf(firstDayOfYear),
    lastDayOfYear: dateOf(lastDayOfYear),
    firstDayOfWeek: dateOf(firstDayOfWeek),
    lastDayOfWeek: dateOf(lastDayOfWeek),
    firstDayOfMonth: dateOf(firstDayOfMonth),
    lastDayOfMonth: dateOf(lastDayOfMonth),
    nextWeek: dateOf(forwardOneWeek),
    nextMonth: dateOf(forwardOneMonth),
    nextYear: dateOf(forwardOneYear),
    previousWeek: dateOf(backwardOneWeek)
  };
})();