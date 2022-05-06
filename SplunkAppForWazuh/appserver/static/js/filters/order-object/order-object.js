define(['../module'], function (app) {
  app.filter('orderObjectBy', function () {
    return function (items, field, reverse) {
      if (!items) return []

      const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n)

      const filtered = []

      items.forEach((item, key) => {
        item.key = key
        filtered.push(item)
      })

      const index = (obj, i) => obj[i]

      filtered.sort((a, b) => {
        let reducedA = field.split('.').reduce(index, a)
        let reducedB = field.split('.').reduce(index, b)

        if (isNumeric(reducedA) && isNumeric(reducedB)) {
          reducedA = Number(reducedA)
          reducedB = Number(reducedB)
        }

        if (reducedA === reducedB) return 0
        else return reducedA > reducedB ? 1 : -1
      })

      if (reverse) {
        filtered.reverse()
      }

      return filtered
    }
  })
})
