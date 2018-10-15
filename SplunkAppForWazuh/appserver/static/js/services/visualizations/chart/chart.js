define([
  "splunkjs/mvc/simplexml",
  "splunkjs/mvc/simplexml/dashboardview",
  "splunkjs/mvc/simplexml/element/chart",
  "../viz/viz"

], function (
  DashboardController,
  Dashboard,
  ChartElement,
  Viz
) {
    'use strict'

    return class SimpleChart extends Viz {

      constructor(id, search, attachedElement) {
        super(new ChartElement({
          "id": `${id}`,
          "charting.legend.placement": "right",
          "charting.drilldown": "none",
          "refresh.display": "progressbar",
          "charting.chart": "area",
          "charting.axisLabelsX.majorLabelStyle.rotation": "-90",
          "trellis.enabled": "0",
          "resizable": true,
          "trellis.scales.shared": "1",
          "charting.axisTitleX.visibility": "visible",
          "charting.axisTitleY.visibility": "visible",
          "charting.axisTitleY2.visibility": "visible",
          "managerid": `${id}Search`,
          "el": $(`#${attachedElement}`)
        }, { tokens: true, tokenNamespace: "submitted" }).render(), id, search)
      }

    }

  })
