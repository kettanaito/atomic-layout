import propAliases from '../../../src/const/propAliases'

const defaultValue = 10
const assertValues = {
  // prettier-ignore
  template: "first",
  templateCols: '500px',
  templateRows: '500px',
  col: '1 / auto',
  colStart: '2',
  colEnd: '3',
  gutter: '20px 25px',
  margin: ['0px', 10],
  flexDirection: ['row', 'column'],
  flexShrink: ['0', '1'],
  flexGrow: ['1', '0'],
  flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
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
  Object.keys(propAliases).forEach((propAliasName) => {
    it(propAliasName, () => {
      const propValues = assertValues[propAliasName] || defaultValue

      Array.prototype.concat(propValues).forEach((propValue) => {
        cy.visit(
          `/other/prop-aliases?propAlias=${propAliasName}&propValue=${propValue}`,
        )

        cy.get('#composition').assertPropAlias(
          propAliasName,
          propValue,
          exactAssertion[propAliasName],
        )
      })
    })
  })
})
