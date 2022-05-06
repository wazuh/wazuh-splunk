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
      const result = {
        duration: 'Unknown',
        inProgress: false,
        end: this.end || 'Unknown',
        start: this.start || 'Unknown',
      }

      if (!start || !end) {
        return result
      }

      this.start = new Date(start)
      this.end = new Date(end)

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
      if (!d) {
        return ''
      }

      try {
        const [day, time] = d.indexOf('T') !== -1 ? d.split('T') : d.split(' ')
        const splitChar =
          d.indexOf('-') !== -1
            ? '-'
            : d.indexOf('.') !== -1
            ? '.'
            : d.indexOf('/') !== -1
            ? '/'
            : ''
        const [year, month, monthDay] = day.split(splitChar)
        const [hour, minute, seconds] = time.split(':')
        const date = new Date(
          year,
          parseInt(month) - 1,
          parseInt(monthDay),
          parseInt(hour),
          parseInt(minute),
          seconds ? parseInt(seconds.split('.')[0]) : 0
        )
        const offset = new Date().getTimezoneOffset()
        const offsetTime = new Date(date.getTime() - offset * 60000)
        return offsetTime.toLocaleString('en-ZA').replace(',', '')
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }

  module.service('$dateDiffService', DateDiffService)
})
