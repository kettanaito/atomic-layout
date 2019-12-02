const assertAxis = (areas, areaName, getArea, createSelector, areaPosition) => {
  const [rowIndex, columnIndex] = areaPosition

  const existingAreasOtherThan = (areaName) => (siblingAreaName) => {
    return !!siblingAreaName && siblingAreaName !== areaName
  }

  // Assert same Y axis with the areas in the same row
  const rowSiblings = areas[rowIndex].filter(existingAreasOtherThan(areaName))

  rowSiblings.map((siblingAreaName) => {
    getArea(areaName)
      .haveSameAxis('y', createSelector(siblingAreaName))
      .notIntersectWith(createSelector(siblingAreaName))
  })

  // Assert same X axis with the areas in the same column
  const columnSiblings = areas
    .reduce((acc, row) => {
      return acc.concat(row[columnIndex])
    }, [])
    .filter(existingAreasOtherThan(areaName))

  columnSiblings.forEach((siblingAreaName) => {
    getArea(areaName)
      .haveSameAxis('x', createSelector(siblingAreaName))
      .notIntersectWith(createSelector(siblingAreaName))
  })
}

export default function assertAreas(areas, context = null) {
  const createSelector = (areaName) => {
    return [context, `[data-area="${areaName}"]`].filter(Boolean).join(' ')
  }
  const getArea = (areaName) => cy.get(createSelector(areaName))

  areas.forEach((row, rowIndex) => {
    row.forEach((areaName, columnIndex) => {
      // Bypass "false" or missing areas
      if (!areaName) {
        return
      }

      // Assert that area is displayed on the page
      cy.log(`Assert area "${areaName}" is visible`)
      getArea(areaName).should('be.visible')

      // Assert that area has proper "grid-area" CSS property
      cy.log(`Assert area "${areaName}" has "grid-area:${areaName}"`)
      getArea(areaName).haveArea(areaName)

      // Assert area's axis relation and intersection with
      // the siblings in the same row and column.
      assertAxis(areas, areaName, getArea, createSelector, [
        rowIndex,
        columnIndex,
      ])
    })
  })
}
