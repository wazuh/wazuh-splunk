define(['splunkjs/mvc/simplexml/element/chart', '../viz/viz'], function(
  ChartElement,
  Viz
) {
  'use strict';

  return class ColumnChart extends Viz {
    /**
     * Generates a new Column Chart Splunk visualization
     * @param {String} id
     * @param {String} search
     * @param {String} attachedElement
     */
    constructor(id, search, attachedElement) {
      super(
        new ChartElement(
          {
            id: `${id}`,
            resizable: true,
            'charting.drilldown': 'none',
            'charting.chart': 'column',
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
