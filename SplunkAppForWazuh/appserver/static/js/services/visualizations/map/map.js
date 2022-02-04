define(['splunkjs/mvc/simplexml/element/map', '../viz/viz'], function (
  MapElement,
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
        new MapElement(
          {
            id: `${id}`,
            'mapping.map.center': '(0,0.53)',
            'mapping.legend.placement': 'bottomright',
            'mapping.choroplethLayer.colorMode': 'auto',
            'mapping.markerLayer.markerOpacity': '0.8',
            drilldown: 'none',
            'mapping.tileLayer.maxZoom': '19',
            'mapping.choroplethLayer.neutralPoint': '0',
            'trellis.enabled': '0',
            'mapping.markerLayer.markerMinSize': '10',
            'mapping.tileLayer.minZoom': '0',
            'mapping.choroplethLayer.minimumColor': '0x2F25BA',
            'mapping.choroplethLayer.colorBins': '5',
            'mapping.map.zoom': '2',
            'trellis.scales.shared': '1',
            'mapping.type': 'marker',
            'mapping.tileLayer.tileOpacity': '1',
            resizable: true,
            'mapping.markerLayer.markerMaxSize': '50',
            'mapping.tileLayer.url':
              'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'mapping.choroplethLayer.maximumColor': '0xDB5800',
            'mapping.map.scrollZoom': '0',
            'mapping.showTiles': '1',
            'mapping.choroplethLayer.showBorder': '1',
            'trellis.size': 'medium',
            'mapping.choroplethLayer.shapeOpacity': '0.75',
            'mapping.data.maxClusters': '100',
            'mapping.map.panning': '1',
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
