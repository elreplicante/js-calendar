'use strict';

describe('DateRange', function() {
  var clock, dateRange;

  beforeEach(function() {
    clock = Clock();
    spyOn(clock, 'currentDate').and.returnValue("2014-11-11");
    dateRange = DateRange(clock, dateManipulations);
  });

  describe('on creation', function() {
    it('should show the current week', function() {
      expectThatDateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
    });
  });

  describe('when a new period is selected', function() {
    it('should show the current month in case of a month', function() {
      dateRange.useMonth();

      expectThatDateRange(dateRange).startsOn("2014-11-01").andEndsOn("2014-11-30");
    });

    it('should show the current year in case of a year', function() {
      dateRange.useYear();

      expectThatDateRange(dateRange).startsOn("2014-01-01").andEndsOn("2014-12-31");
    });

    it('should show the current week in case of a week', function() {
      dateRange.useYear();

      dateRange.useWeek();

      expectThatDateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
    });
  });

  describe('when moving to the next period', function() {
    it('should show the next week in case of a week period', function() {
      dateRange.next();

      expectThatDateRange(dateRange).startsOn("2014-11-17").andEndsOn("2014-11-23");
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