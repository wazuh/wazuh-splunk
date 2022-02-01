define(['splunkjs/mvc/simplexml/element/chart', '../viz/viz'], function (
  ChartElement,
  Viz
) {
  'use strict'

  return class LinearChart extends Viz {
    /**
     * Generates a new Linear Chart Splunk visualization
     * @param {String} id
     * @param {String} search
     * @param {String} attachedElement
     * @param {scope} scope
     * @param {scope} extraParams
     */
    constructor(id, search, attachedElement, scope, extraParams = {}) {
      var customAxisTitleX = ''
      if (extraParams.customAxisTitleX)
        customAxisTitleX = extraParams.customAxisTitleX
      super(
        new ChartElement(
          {
            id: `${id}`,
            resizable: true,
            'charting.drilldown': 'none',
            'charting.chart': 'line',
            'charting.axisTitleX.text': customAxisTitleX,
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
