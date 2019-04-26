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
      const result = {
        duration: 'Unknown',
        inProgress: false,
        end: this.end || 'Unknown',
        start: this.start || 'Unknown'
      }
      if (this.end && this.start) {
        result.duration = (this.end - this.start) / 1000 / 60
        result.duration = Math.round(result.duration * 100) / 100
        if (result.duration <= 0) {
          result.inProgress = true
        }
      }
      return result
    }

    setBrowserOffset(d) {
      try {
        const date = new Date(d)
        const offset = new Date().getTimezoneOffset()
        const offsetTime = new Date(date.getTime() - offset * 60000)
        const result = offsetTime.toLocaleString('en-ZA').replace(',', '')
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }

  module.service('$dateDiffService', DateDiffService)
})
