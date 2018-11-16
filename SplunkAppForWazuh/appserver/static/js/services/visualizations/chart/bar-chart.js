define(['splunkjs/mvc/simplexml/element/chart', '../viz/viz'], function(
  ChartElement,
  Viz
) {
  'use strict';

  return class BarChart extends Viz {
    /**
     * Generates a new Bar Chart Splunk visualization
     * @param {String} id
     * @param {String} search
     * @param {String} attachedElement
     */
    constructor(id, search, attachedElement) {
      super(
        new ChartElement(
          {
            id: `${id}`,
            'charting.drilldown': 'none',
            'charting.chart': 'bar',
            resizable: true,
            managerid: `${id}Search`,
            el: $(`#${attachedElement}`)
          },
          { tokens: true, tokenNamespace: 'submitted' }
        ).render(),
        id,
        search
      );
    }
  };
});
