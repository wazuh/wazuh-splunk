import _ from 'lodash';

export default function getDataGroupBy(data = [], key) {
  const tempData = {};

  data.forEach(item => {
    if (!tempData[item[key]]) {
      tempData[item[key]] = [];
    }
    tempData[item[key]].push(_.omit(item, [key]));
  });

  return Object.entries(tempData).map(item => ({
    groupTitle: item[0],
    children: item[1]
  }));
}
