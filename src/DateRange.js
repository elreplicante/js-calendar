function DateRange(clock) {

  this.clock = clock;
  this._startDate;
  this._endDate;

  this.monday = function(date) {
    return moment(date).day("Monday");
  }

  this.sunday = function(date) {
    return this.monday(date).add(6, "days");
  }

  this.updateRange = function(currentDate) {
    this._startDate = this.monday(currentDate).toDate();
    this._endDate = this.sunday(currentDate).toDate();
  }

  this.updateRange(this.clock.currentDate());

  this.startDate = function() {
    return this._startDate;
  }

  this.endDate = function() {
    return this._endDate;
  }
}