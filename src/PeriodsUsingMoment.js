var periodsUsingMoment = (function() {
  var DAYS = "days",
    YEARS = "years",
    MONTHS = "months",
    WEEKS = "weeks",
    oneWeekAheadOf = dateOf(ahead(1, WEEKS)),
    oneMonthAheadOf = dateOf(ahead(1, MONTHS)),
    oneYearAheadOf = dateOf(ahead(1, YEARS)),
    oneWeekBackFrom = dateOf(back(1, WEEKS)),
    oneMonthBackFrom = dateOf(back(1, MONTHS)),
    oneYearBackFrom = dateOf(back(1, YEARS)),
    monthPeriodContaining = rangeBetween(
      dateOf(firstDayOfMonth), dateOf(lastDayOfMonth)
    ),
    yearPeriodContaining = rangeBetween(
      dateOf(firstDayOfYear), dateOf(lastDayOfYear)
    ),
    weekPeriodContaining = rangeBetween(
      dateOf(firstDayOfWeek), dateOf(lastDayOfWeek)
    );

  return {
    Month: Month,
    Year: Year,
    Week: Week
  };

  function Month() {
    return {
      rangeFor: function(currentDate) {
        return monthPeriodContaining(currentDate);
      },

      nextDate: function(currentDate) {
        return oneMonthAheadOf(currentDate);
      },

      previousDate: function(currentDate) {
        return oneMonthBackFrom(currentDate);
      }
    };
  }

  function Week() {
    return {
      rangeFor: function(currentDate) {
        return weekPeriodContaining(currentDate);
      },

      nextDate: function(currentDate) {
        return oneWeekAheadOf(currentDate);
      },

      previousDate: function(currentDate) {
        return oneWeekBackFrom(currentDate);
      }
    };
  }

  function Year() {
    return {
      rangeFor: function(currentDate) {
        return yearPeriodContaining(currentDate);
      },

      nextDate: function(currentDate) {
        return oneYearAheadOf(currentDate);
      },

      previousDate: function(currentDate) {
        return oneYearBackFrom(currentDate);
      }
    };
  }

  function firstDayOfYear(date) {
    return moment(date).dayOfYear(1);
  }

  function lastDayOfYear(date) {
    return firstDayOfYear(date).add(1, YEARS).add(-1, DAYS);
  }

  function firstDayOfWeek(date) {
    return moment(date).day("Monday");
  }

  function lastDayOfWeek(date) {
    return firstDayOfWeek(date).add(6, DAYS);
  }

  function firstDayOfMonth(date) {
    return moment(date).date(1);
  }

  function lastDayOfMonth(date) {
    var daysInMonth = moment(date).daysInMonth();
    return firstDayOfMonth(date).add(daysInMonth - 1, DAYS);
  }

  function ahead(num, period) {
    return function(date) {
      return moment(date).add(num, period);
    };
  }

  function back(num, period) {
    return function(date) {
      return moment(date).add(-num, period);
    };
  }

  function dateOf(fn) {
    return function(date) {
      return fn(date).toDate();
    };
  }

  function rangeBetween(getStartDate, getEndDate) {
    return function(date) {
      return {
        startDate: getStartDate(date),
        endDate: getEndDate(date)
      };
    };
  }
})();