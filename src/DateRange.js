var DateRange = (function() {
  return function(clock) {
    var startDate,
      endDate,
      WEEK_PERIOD = "WEEK",
      MONTH_PERIOD = "MONTH",
      YEAR_PERIOD = "YEAR",
      period = WEEK_PERIOD,

      Month = (function() {
        return {
          updateRange: function(currentDate) {
            setRange(firstDayOfMonth(currentDate), lastDayOfMonth(currentDate));
          }
        };
      })(),

      Week = (function() {
        return {
          updateRange: function(currentDate) {
            setRange(monday(currentDate), sunday(currentDate));
          }
        };
      })(),

      Year = (function() {
        return {
          updateRange: function(currentDate) {
            setRange(firstDayOfYear(currentDate), lastDayOfYear(currentDate));
          }
        };
      })(),

      periodObject = Week;

    updateRange(clock.currentDate());

    return {
      startDate: function() {
        return startDate;
      },
      endDate: function() {
        return endDate;
      },
      useMonth: function() {
        period = MONTH_PERIOD;
        periodObject = Month;
        updateRange(clock.currentDate());
      },
      useYear: function() {
        period = YEAR_PERIOD;
        updateRange(clock.currentDate());
      }
    };

    function updateRange(currentDate) {
      if (usingWeekPeriod()) {
        periodObject.updateRange(currentDate);
      } else if (usingMonthPeriod()) {
        periodObject.updateRange(currentDate);
      } else {
        setRange(firstDayOfYear(currentDate), lastDayOfYear(currentDate));
      }
    }

    function setRange(newStartDate, newEndDate) {
      startDate = newStartDate.toDate();
      endDate = newEndDate.toDate();
    }

    function usingWeekPeriod() {
      return period === WEEK_PERIOD;
    }

    function usingMonthPeriod() {
      return period === MONTH_PERIOD;
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
      return firstDayOfYear(date).add(1, "years").add(-1, "days");
    }
  };
})();