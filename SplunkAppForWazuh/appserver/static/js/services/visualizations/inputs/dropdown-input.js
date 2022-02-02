define(['splunkjs/mvc/simpleform/input/dropdown', '../viz/viz'], function (
  DropdownInput,
  Viz
) {
  'use strict'

  return class Dropdown extends Viz {
    /**
     * Generates a new Dropwdown Splunk visualization
     * @param {String} id
     * @param {String} search
     * @param {String} fieldName
     * @param {String} attachedElement
     * @param {scope} scope
     */
    constructor(
      id,
      search,
      fieldName,
      value,
      attachedElement,
      scope,
      defaultValue,
      earliestTtime,
      latestTime
    ) {
      defaultValue = defaultValue ? defaultValue : '*'
      super(
        new DropdownInput(
          {
            id: `${id}`,
            choices: [{ label: 'ALL', value: '*' }],
            labelField: fieldName,
            valueField: fieldName,
            initialValue: '*',
            default: defaultValue,
            selectFirstChoice: false,
            showClearButton: true,
            value: value,
            searchWhenChanged: true,
            managerid: `${id}Search`,
            el: $(`#${attachedElement}`),
          },
          { tokens: true, tokenNamespace: 'submitted' }
        ).render(),
        id,
        search,
        scope,
        earliestTtime,
        latestTime
      )
    }
  }
})
