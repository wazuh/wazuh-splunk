define(['splunkjs/mvc', 'splunkjs/mvc/simpleform/input/timerange'], function (
  mvc,
  TimeRangeInput
) {
  'use strict'

  return class TimePicker {
    /**
     * Generates a new visualization
     * @param {Object} element
     * @param {Function} handleValueChange
     */
    constructor(element, handleValueChange) {
      mvc.Components.revokeInstance('timePicker')
      this.input = new TimeRangeInput(
        {
          id: 'timePicker',
          default: { latest_time: 'now', earliest_time: '-24h@h' },
          searchWhenChanged: true,
          earliest_time: '$form.when.earliest$',
          latest_time: '$form.when.latest$',
          el: $(`${element}`),
        },
        { tokens: true }
      ).render()
      this.handleValueChange = handleValueChange
      this.input.on('change', (newValue) => {
        try {
          localStorage.setItem('searchTimeRange', JSON.stringify(newValue))
        } catch (error) {} //eslint-disable-line
        if (newValue && this.input) this.handleValueChange(this.input, newValue)
      })
    }

    /**
     * Gets the TimeRangeInput
     */
    get() {
      return this.input
    }

    /**
     * Destroys the TimeRangeInput instance
     */
    destroy() {
      mvc.Components.revokeInstance('timePicker')
      this.input.off('change')
      this.input = null
    }
  }
})
