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
        updateRangeUsingNewPeriod(month);
      },
      useYear: function() {
        updateRangeUsingNewPeriod(year);
      },
      useWeek: function() {
        updateRangeUsingNewPeriod(week);
      }
    };

    function updateRangeUsingNewPeriod(newPeriod) {
      period = newPeriod;
      updateRange();
    }

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
          setRange(
            dateFns.firstDayOfMonth(currentDate),
            dateFns.lastDayOfMonth(currentDate)
          );
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
        }
      };
    }
  };
})();