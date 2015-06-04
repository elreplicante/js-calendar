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

  function forwardOneWeekFrom(date) {
    return moment(date).add(1, "weeks");
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
    nextWeek: dateOf(forwardOneWeekFrom)
  };
})();