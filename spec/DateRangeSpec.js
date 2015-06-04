'use strict';

describe('DateRange', function() {
  var clock, dateRange;

  beforeEach(function() {
    clock = Clock();
    spyOn(clock, 'currentDate').and.returnValue("2014-11-11");
    dateRange = DateRange(clock, dateManipulations);
  });

  describe('on creation', function() {
    it('should contain the current week', function() {
      expectThatDateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
    });
  });

  describe('when a new period is selected', function() {
    it('should contain the current month in case of a month', function() {
      dateRange.useMonth();

      expectThatDateRange(dateRange).startsOn("2014-11-01").andEndsOn("2014-11-30");
    });

    it('should contain the current year in case of a year', function() {
      dateRange.useYear();

      expectThatDateRange(dateRange).startsOn("2014-01-01").andEndsOn("2014-12-31");
    });

    it('should contain the current week in case of a week', function() {
      dateRange.useYear();

      dateRange.useWeek();

      expectThatDateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
    });
  });

  describe('when moving to the next period', function() {
    it('should contain the next week in case of using a week period', function() {
      dateRange.next();

      expectThatDateRange(dateRange).startsOn("2014-11-17").andEndsOn("2014-11-23");
    });

    it('should contain the next month in case of using a month period', function() {
      dateRange.useMonth();

      dateRange.next();

      expectThatDateRange(dateRange).startsOn("2014-12-01").andEndsOn("2014-12-31");
    });

    it('should contain the next year in case of using a year period', function() {
      dateRange.useYear();

      dateRange.next();

      expectThatDateRange(dateRange).startsOn("2015-01-01").andEndsOn("2015-12-31");
    });
  });

  describe('when moving two periods ahead', function() {
    it('should contain the week after the next week in case of using a week period', function() {
      dateRange.next();
      dateRange.next();

      expectThatDateRange(dateRange).startsOn("2014-11-24").andEndsOn("2014-11-30");
    });
  });

  describe('when moving to the previous period', function() {
    it('should contain the previous week in case of using a week period', function() {
      dateRange.previous();

      expectThatDateRange(dateRange).startsOn("2014-11-03").andEndsOn("2014-11-09");
    });

    it('should contain the previous month in case of using a month period', function() {
      dateRange.useMonth();

      dateRange.previous();

      expectThatDateRange(dateRange).startsOn("2014-10-01").andEndsOn("2014-10-31");
    });

    it('should contain the previous year in case of using a year period', function() {
      dateRange.useYear();

      dateRange.previous();

      expectThatDateRange(dateRange).startsOn("2013-01-01").andEndsOn("2013-12-31");
    });
  });

  describe("when moving back to the current period", function() {
    function moveAwayFromCurrentDate(dateRange) {
      dateRange.previous();
      dateRange.previous();
      dateRange.previous();
      dateRange.previous();
      dateRange.next;
    }

    it('should contain the current week in case of using a week period', function() {
      moveAwayFromCurrentDate(dateRange);

      dateRange.current();

      expectThatDateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
    });

    it('should contain the current month in case of using a month period', function() {
      dateRange.useMonth();
      moveAwayFromCurrentDate(dateRange);

      dateRange.current();

      expectThatDateRange(dateRange).startsOn("2014-11-01").andEndsOn("2014-11-30");
    });

    it('should contain the current year in case of using a year period', function() {
      dateRange.useYear();
      moveAwayFromCurrentDate(dateRange);

      dateRange.current();

      expectThatDateRange(dateRange).startsOn("2014-01-01").andEndsOn("2014-12-31");
    });
  });

  function expectThatDateRange(dateRange) {
    return {
      startsOn: function(startDate) {
        return {
          andEndsOn: function(endDate) {
            expect(dateRange.startDate()).toEqual(moment(startDate).toDate());
            expect(dateRange.endDate()).toEqual(moment(endDate).toDate());
          }
        };
      }
    };
  }
});