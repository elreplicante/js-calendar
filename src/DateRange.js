var DateRange = (function() {
  return function(clock, dateFns) {
    var startDate, endDate,
      month = Month(dateFns),
      week = Week(dateFns),
      year = Year(dateFns),
      period = week;

    updateRange();

    return {
      startDate: function() {
        return startDate;
      },
      endDate: function() {
        return endDate;
      },
      useMonth: function() {
        period = month;
        updateRange();
      },
      useYear: function() {
        period = year;
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

    function Month(dateFns) {
      return {
        updateRange: function(currentDate) {
          setRange(firstDayOfMonth(currentDate), lastDayOfMonth(currentDate));
        }
      };

      function firstDayOfMonth(date) {
        return dateFns.firstDayOfMonth(date);
      }

      function lastDayOfMonth(date) {
        return dateFns.lastDayOfMonth(date);
      }
    }

    function Week(dateFns) {
      return {
        updateRange: function(currentDate) {
          setRange(monday(currentDate), sunday(currentDate));
        }
      };

      function monday(date) {
        return dateFns.monday(date);
      }

      function sunday(date) {
        return dateFns.sunday(date);
      }
    }

    function Year(dateFns) {
      return {
        updateRange: function(currentDate) {
          setRange(firstDayOfYear(currentDate), lastDayOfYear(currentDate));
        }
      };

      function firstDayOfYear(date) {
        return dateFns.firstDayOfYear(date);
      }

      function lastDayOfYear(date) {
        return dateFns.lastDayOfYear(date);
      }
    }
  };
})();