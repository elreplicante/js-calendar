var DateRange = (function() {
  return function(clock) {
    var startDate, endDate,
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

      period = Week;

    updateRange();

    return {
      startDate: function() {
        return startDate;
      },
      endDate: function() {
        return endDate;
      },
      useMonth: function() {
        period = Month;
        updateRange();
      },
      useYear: function() {
        period = Year;
        updateRange();
      }
    };

    function updateRange() {
      period.updateRange(clock.currentDate());
    }

    function setRange(newStartDate, newEndDate) {
      startDate = newStartDate.toDate();
      endDate = newEndDate.toDate();
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