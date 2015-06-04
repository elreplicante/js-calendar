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
      }
    };

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

    function updateRange(currentDate) {
      if(period === "WEEK") {
        startDate = monday(currentDate).toDate();
        endDate = sunday(currentDate).toDate();
      } else {
        startDate = firstDayOfMonth(currentDate).toDate();
        endDate = lastDayOfMonth(currentDate).toDate();
      }
    }
  };
})();