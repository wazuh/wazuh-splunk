define(['../module'], function (module) {
  'use strict'

  class ChartService {
    constructor() {
    }

    /**
     * Build a new chart
     * @param {String} canvas
     * @param {String} type
     * @param {String} labels
     * @param {String} data
     * @param {String} options
     * @param {String} colors
     */
    buildChart(canvas, type, labels, data, options, colors) {
      return new Chart(canvas,
        {
          type: type,
          data: {
            labels: labels,
            datasets: [
              {
                backgroundColor: colors,
                data: data,
              }
            ]
          },
          options: options
        });
    }

  }
  module.service('$chartService', ChartService)
})
