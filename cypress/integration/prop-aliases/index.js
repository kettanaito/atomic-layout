import propAliases from '../../../src/const/propAliases'

const exactValues = {
  template: '"first"',
  templateCols: '500px',
  templateRows: '500px',
  col: '1 / auto',
  colStart: '2',
  colEnd: '3',
  gutter: '20px 25px',
  row: '1 / auto',
  rowStart: '2',
  rowEnd: '3',
  align: 'center',
  alignItems: 'flex-end',
  alignContent: 'flex-start',
  justify: 'center',
  justifyItems: 'flex-end',
  justifyContent: 'flex-start',
  place: 'center center',
  placeItems: 'flex-end flex-end',
  placeContent: 'flex-start flex-start',
}

describe('Prop aliases', () => {
  Object.keys(propAliases).forEach((aliasPropName) => {
    it(aliasPropName, () => {
      const propValue = exactValues[aliasPropName] || 10

      cy.visit(
        `/misc/prop-aliases?propAlias=${aliasPropName}&propValue=${propValue}`,
      )

      cy.get('#composition').assertPropAlias(aliasPropName, propValue)
    })
  })
})
