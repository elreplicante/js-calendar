'use strict';

var DateRange = (function() {
  return function(clock, dateFns) {
    var month = Month(dateFns),
      week = Week(dateFns),
      year = Year(dateFns),
      period = week,
      currentDate = clock.currentDate(),
      dateRange = period.rangeFor(currentDate);

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
      dateRange = period.rangeFor(currentDate);
    }

    function previous() {
      currentDate = period.previousDate(currentDate);
      dateRange = period.rangeFor(currentDate);
    }

    function next() {
      currentDate = period.nextDate(currentDate);
      dateRange = period.rangeFor(currentDate);
    }

    function updateRangeUsingNewPeriod(newPeriod) {
      period = newPeriod;
      dateRange = period.rangeFor(currentDate);
    }

    function Month(dateFns) {
      return {
        rangeFor: function(currentDate) {
          return dateFns.monthPeriodContaining(currentDate);
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
          return dateFns.weekPeriodContaining(currentDate);
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
          return dateFns.yearPeriodContaining(currentDate);
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