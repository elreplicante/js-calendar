var DateRange = (function() {
  return function(clock, dateFns) {
    var startDate, endDate,
      month = Month(dateFns),
      week = Week(dateFns),
      year = Year(dateFns),
      period = week,
      currentDate = clock.currentDate();

    period.updateRange(currentDate);

    return {
      startDate: function() {
        return startDate;
      },
      endDate: function() {
        return endDate;
      },
      useMonth: function() {
        updateRangeUsingNewPeriod(month);
      },
      useYear: function() {
        updateRangeUsingNewPeriod(year);
      },
      useWeek: function() {
        updateRangeUsingNewPeriod(week);
      },
      next: function() {
        nextRange();
      }
    };

    function nextRange() {
      currentDate = period.nextDate(currentDate);
      period.updateRange(currentDate);
    }

    function updateRangeUsingNewPeriod(newPeriod) {
      period = newPeriod;
      period.updateRange(currentDate);
    }

    function setRange(newStartDate, newEndDate) {
      startDate = newStartDate;
      endDate = newEndDate;
    }

    function Month(dateFns) {
      return {
        updateRange: function(currentDate) {
          setRange(
            dateFns.firstDayOfMonth(currentDate),
            dateFns.lastDayOfMonth(currentDate)
          );
        },

        nextDate: function(currentDate) {
          return dateFns.nextMonth(currentDate);
        }

      };
    }

    function Week(dateFns) {
      return {
        updateRange: function(currentDate) {
          setRange(
            dateFns.firstDayOfWeek(currentDate),
            dateFns.lastDayOfWeek(currentDate)
          );
        },

        nextDate: function(currentDate) {
          return dateFns.nextWeek(currentDate);
        }
      };
    }

    function Year(dateFns) {
      return {
        updateRange: function(currentDate) {
          setRange(
            dateFns.firstDayOfYear(currentDate),
            dateFns.lastDayOfYear(currentDate)
          );
        },

        nextDate: function(currentDate) {
          return dateFns.nextYear(currentDate);
        }
      };
    }
  };
})();