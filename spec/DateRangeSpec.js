'use strict';

describe('DateRange', function() {
  it('should show the current week on creation ', function() {
    var dateRange,
      clock = {
        currentDate: function() {
          return new Date();
        }
      };

    spyOn(clock, 'currentDate').and.returnValue("2014-11-11");

    dateRange = DateRange(clock);

    expectDateRange("2014-11-10", "2014-11-16", dateRange);
  });

  it('should show the current month when a month period is selected', function() {
    var dateRange,
      clock = {
        currentDate: function() {
          return new Date();
        }
      };
      spyOn(clock, 'currentDate').and.returnValue("2014-11-11");

      dateRange = DateRange(clock);

      dateRange.useMonth();

     expectDateRange("2014-11-01", "2014-11-30", dateRange);
  });

  function expectDateRange(startDate, endDate, dateRange) {
    expect(dateRange.startDate()).toEqual(moment(startDate).toDate());
    expect(dateRange.endDate()).toEqual(moment(endDate).toDate());
  }
});