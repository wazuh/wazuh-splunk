define(['splunkjs/mvc/simplexml/element/single', '../viz/viz'], function (
  SingleElement,
  Viz
) {
  'use strict'

  return class SingleValue extends Viz {
    /**
     * Generates a new Single Value Splunk visualization
     * @param {String} id
     * @param {String} search
     * @param {String} attachedElement
     * @param {scope} scope
     */
    constructor(id, search, attachedElement, scope) {
      super(
        new SingleElement(
          {
            id: `${id}`,
            managerid: `${id}Search`,
            height: '190',
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
