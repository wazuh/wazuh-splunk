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

    return class LinearChar extends Viz {

      constructor(id, search, attachedElement) {
        super(new ChartElement({
          "id": `${id}`,
          "trellis.size": "medium",
          "charting.axisY2.scale": "inherit",
          "charting.chart.showDataLabels": "none",
          "charting.chart.stackMode": "stacked100",
          "resizable": true,
          "charting.axisTitleY2.visibility": "visible",
          "charting.drilldown": "none",
          "charting.chart": "line",
          "charting.layout.splitSeries.allowIndependentYRanges": "0",
          "charting.chart.nullValueMode": "gaps",
          "trellis.scales.shared": "1",
          "charting.layout.splitSeries": "0",
          "charting.axisTitleX.visibility": "collapsed",
          "charting.legend.labelStyle.overflowMode": "ellipsisMiddle",
          "charting.chart.style": "minimal",
          "charting.axisTitleY.visibility": "visible",
          "charting.axisLabelsX.majorLabelStyle.overflowMode": "ellipsisNone",
          "charting.chart.bubbleMinimumSize": "10",
          "charting.axisX.scale": "linear",
          "trellis.enabled": "0",
          "charting.axisY2.enabled": "0",
          "charting.legend.placement": "right",
          "charting.chart.bubbleSizeBy": "area",
          "charting.axisLabelsX.majorLabelStyle.rotation": "0",
          "charting.chart.bubbleMaximumSize": "50",
          "charting.chart.sliceCollapsingThreshold": "0.01",
          "charting.axisY.scale": "linear",
          "managerid": `${id}Search`,
          "el": $(`#${attachedElement}`)
        }, { tokens: true, tokenNamespace: "submitted" }).render(), id, search)
      }

    }

  })
