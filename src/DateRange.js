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
      } else if(period === "MONTH") {
        startDate = firstDayOfMonth(currentDate).toDate();
        endDate = lastDayOfMonth(currentDate).toDate();
      } else {
        startDate = moment(currentDate).dayOfYear(1).toDate();
        endDate = moment(currentDate).dayOfYear(1).add(1,"years").add(-1, "days").toDate();
      }
    }
  };
})();