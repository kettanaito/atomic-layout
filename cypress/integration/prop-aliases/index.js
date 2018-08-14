import propAliases from '../../../src/const/propAliases'

const assertValues = {
  // prettier-ignore
  template: "first",
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

const normalizeQuotes = (str) => str.replace(/"+/g, "'")

const exactAssertion = {
  template: (cssValue, expectedValue) => {
    return normalizeQuotes(cssValue) === normalizeQuotes(expectedValue)
  },
}

describe('Prop aliases', () => {
  Object.keys(propAliases).forEach((aliasPropName) => {
    it(aliasPropName, () => {
      const propValue = assertValues[aliasPropName] || 10

      cy.visit(
        `/misc/prop-aliases?propAlias=${aliasPropName}&propValue=${propValue}`,
      )

      cy.get('#composition').assertPropAlias(
        aliasPropName,
        propValue,
        exactAssertion[aliasPropName],
      )
    })
  })
})
