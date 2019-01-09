define(['splunkjs/mvc/simplexml/element/chart', '../viz/viz'], function(
  ChartElement,
  Viz
) {
  'use strict'

  return class AreaChart extends Viz {
    /**
     * Generates a new Linear Chart Splunk visualization
     * @param {String} id
     * @param {String} search
     * @param {String} attachedElement
     * @param {scope} scope
     */
    constructor(id, search, attachedElement, scope) {
      super(
        new ChartElement(
          {
            id: `${id}`,
            resizable: true,
            'charting.drilldown': 'none',
            'charting.chart': 'area',
            managerid: `${id}Search`,
            el: $(`#${attachedElement}`)
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
