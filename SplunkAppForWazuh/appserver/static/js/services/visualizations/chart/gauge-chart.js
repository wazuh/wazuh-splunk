define(['splunkjs/mvc/simplexml/element/chart', '../viz/viz'], function (
  ChartElement,
  Viz
) {
  'use strict'

  return class GaugeChart extends Viz {
    /**
     * Generates a new Column Chart Splunk visualization
     * @param {String} id
     * @param {String} search
     * @param {String} attachedElement
     * @param {scope} scope
     */
    constructor(id, search, attachedElement, conf, scope) {
      const gaugeType = conf.gaugeType ? conf.gaugeType : false
      const trellisEnabled = conf.trellisEnabled ? conf.trellisEnabled : false
      super(
        new ChartElement(
          {
            id: `${id}`,
            resizable: true,
            'charting.drilldown': 'none',
            'charting.chart': gaugeType,
            'trellis.enabled': trellisEnabled,
            'charting.chart.usePercentageRange': true,
            'charting.chart.usePercentageValue': true,
            'charting.chart.style': 'minimal',
            'charting.gaugeColors': '[0xB84B56,0xECDA47,0x26AC85]',
            height: '250',
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
