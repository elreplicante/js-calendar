'use strict';

describe('DateRange', function() {
  var clock = Clock(),
    dateRange;

  it('should show the current week on creation ', function() {
    spyOn(clock, 'currentDate').and.returnValue("2014-11-11");
    dateRange = DateRange(clock, dateManipulations);

    expectThatDateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
  });

  it('should show the current month when a month period is selected', function() {
    spyOn(clock, 'currentDate').and.returnValue("2014-11-11");
    dateRange = DateRange(clock, dateManipulations);

    dateRange.useMonth();

    expectThatDateRange(dateRange).startsOn("2014-11-01").andEndsOn("2014-11-30");
  });

  it('should show the current year when a year period is selected', function() {
    spyOn(clock, 'currentDate').and.returnValue("2014-11-11");
    dateRange = DateRange(clock, dateManipulations);

    dateRange.useYear();

    expectThatDateRange(dateRange).startsOn("2014-01-01").andEndsOn("2014-12-31");
  });

  it('should show the current week when a week period is selected back', function() {
    spyOn(clock, 'currentDate').and.returnValue("2014-11-11");
    dateRange = DateRange(clock, dateManipulations);
    dateRange.useYear();

    dateRange.useWeek();

    expectThatDateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
  });

  function expectThatDateRange(dateRange) {
    return {
      startsOn: function (startDate) {
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