'use strict';

describe('DateRange', function () {
  it('should show the current week on creation ', function () {
    
    var clock = {
      currentDate: function(){
        return new Date();
      }
    };

    spyOn(clock, 'currentDate').and.returnValue("2015-06-11");

    var dateRange = new DateRange(clock);
    var startDate = moment("2015-06-08").toDate();
    var endDate = moment("2015-06-14").toDate();

    expect(dateRange.startDate()).toEqual(startDate);
    expect(dateRange.endDate()).toEqual(endDate);
  });
});