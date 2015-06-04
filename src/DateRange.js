var DateRange = (function() {
  return function(clock) {
    var startDate, endDate, period = "WEEK";

    updateRange(clock.currentDate());

    return {
      startDate: function() {
        return startDate;
      },
      endDate: function() {
        return endDate;
      },
      useMonth: function() {
        period = "MONTH";
        updateRange(clock.currentDate());
      },
      useYear: function() {
        period = "YEAR";
        updateRange(clock.currentDate());
      }
    };

    function updateRange(currentDate) {
      if(usingWeekPeriod()) {
        startDate = monday(currentDate).toDate();
        endDate = sunday(currentDate).toDate();
      } else if(usingMonthPeriod()) {
        startDate = firstDayOfMonth(currentDate).toDate();
        endDate = lastDayOfMonth(currentDate).toDate();
      } else {
        startDate = firstDayOfYear(currentDate).toDate();
        endDate = lastDayOfYear(currentDate).toDate();
      }
    }

    function usingWeekPeriod() {
      return period === "WEEK";
    }

    function usingMonthPeriod() {
      return period === "MONTH";
    }

    function monday(date) {
      return moment(date).day("Monday");
    }

    function sunday(date) {
      return monday(date).add(6, "days");
    }

    function firstDayOfMonth(date) {
      return moment(date).date(1);
    }

    function lastDayOfMonth(date) {
      var daysInMonth = moment(date).daysInMonth();
      return firstDayOfMonth(date).add(daysInMonth - 1, "days");
    }

    function firstDayOfYear(date) {
      return moment(date).dayOfYear(1);
    }

    function lastDayOfYear(date) {
      return firstDayOfYear(date).add(1,"years").add(-1, "days");
    }
  };
})();