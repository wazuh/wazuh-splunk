define(['splunkjs/mvc/simplexml/element/chart', '../viz/viz'], function (
  ChartElement,
  Viz
) {
  'use strict'

  return class BarChart extends Viz {
    /**
     * Generates a new Bar Chart Splunk visualization
     * @param {String} id
     * @param {String} search
     * @param {String} attachedElement
     * @param {scope} scope
     */
    constructor(id, search, attachedElement, scope, extraParams = {}) {
      super(
        new ChartElement(
          {
            id: `${id}`,
            'charting.drilldown': 'none',
            'charting.chart': 'bar',
            'charting.chart.stackMode': extraParams.stackMode || 'default',
            resizable: true,
            managerid: `${id}Search`,
            el: $(`#${attachedElement}`),
          },
          { tokens: true, tokenNamespace: 'submitted' }
        ).render(),
        id,
        search,
        scope
      )
    }
  }
})
