var DateRange = (function() {
  return function(clock, dateFns) {
    var dateRange = {
        startDate: void 0,
        endDate: void 0
      },
      month = Month(dateFns),
      week = Week(dateFns),
      year = Year(dateFns),
      period = week,
      currentDate = clock.currentDate();

    period.rangeFor(currentDate);

    return {
      startDate: function() {
        return dateRange.startDate;
      },
      endDate: function() {
        return dateRange.endDate;
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
      next: next,
      previous: previous,
      current: current
    };

    function current() {
      currentDate = clock.currentDate();
      period.rangeFor(currentDate);
    }

    function previous() {
      currentDate = period.previousDate(currentDate);
      period.rangeFor(currentDate);
    }

    function next() {
      currentDate = period.nextDate(currentDate);
      period.rangeFor(currentDate);
    }

    function updateRangeUsingNewPeriod(newPeriod) {
      period = newPeriod;
      period.rangeFor(currentDate);
    }

    function Month(dateFns) {
      return {
        rangeFor: function(currentDate) {
          dateRange = dateFns.monthPeriodContaining(currentDate);
        },

        nextDate: function(currentDate) {
          return dateFns.oneMonthAheadOf(currentDate);
        },

        previousDate: function(currentDate) {
          return dateFns.oneMonthBackFrom(currentDate);
        }
      };
    }

    function Week(dateFns) {
      return {
        rangeFor: function(currentDate) {
          dateRange = dateFns.weekPeriodContaining(currentDate);
        },

        nextDate: function(currentDate) {
          return dateFns.oneWeekAheadOf(currentDate);
        },

        previousDate: function(currentDate) {
          return dateFns.oneWeekBackFrom(currentDate);
        }
      };
    }

    function Year(dateFns) {
      return {
        rangeFor: function(currentDate) {
          dateRange = dateFns.yearPeriodContaining(currentDate);
        },

        nextDate: function(currentDate) {
          return dateFns.oneYearAheadOf(currentDate);
        },

        previousDate: function(currentDate) {
          return dateFns.oneYearBackFrom(currentDate);
        }
      };
    }
  };
})();