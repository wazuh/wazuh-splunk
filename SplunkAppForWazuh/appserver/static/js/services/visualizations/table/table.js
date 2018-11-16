define(['splunkjs/mvc/simplexml/element/table', '../viz/viz'], function(
  TableElement,
  Viz
) {
  'use strict';

  return class Table extends Viz {
    /**
     *
     * @param {String} id
     * @param {String} search
     * @param {String} attachedElement
     */
    constructor(id, search, attachedElement) {
      super(
        new TableElement(
          {
            id: `${id}`,
            dataOverlayMode: 'none',
            drilldown: 'cell',
            percentagesRow: 'false',
            rowNumbers: '10',
            totalsRow: 'false',
            wrap: 'true',
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
