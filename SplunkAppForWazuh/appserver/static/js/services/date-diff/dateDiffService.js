define(['../module'], function (module) {
  'use strict'

  class DateDiffService {
    constructor() {
      this.start = null
      this.end = null
    }

    /**
     * Returns the difference between dates
     */
    getDateDiff(start, end) {
      this.start = new Date(start)
      this.end = new Date(end)
      let duration = 0

      if (this.end && this.start) {
        duration = Math.abs(this.end.getTime() - this.start.getTime()) / 1000
        return duration
      }
    }
  }

  module.service('$dateDiffService', DateDiffService)
})