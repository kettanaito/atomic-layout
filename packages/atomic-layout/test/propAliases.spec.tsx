import React from 'react'
import { propAliases } from '@atomic-layout/core'
import Composition from '../src/components/Composition'
import { render, cleanup, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const defaultValue = 10
const explicitValues: Record<
  string,
  string | number | Array<string | number>
> = {
  area: 'first',
  // prettier-ignore
  areas: 'first',
  // prettier-ignore
  template: "first",
  templateCols: '500px',
  templateRows: '500px',
  col: '1 / auto',
  colStart: '2',
  colEnd: '3',
  gap: '20px 25px',
  gutter: '20px 25px',
  margin: ['0px', 10],
  flexDirection: ['row', 'column'],
  flexShrink: ['0', '1'],
  flexGrow: ['1', '0'],
  flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
  row: '1 / auto',
  rowStart: '2',
  rowEnd: '3',
  autoFlow: ['row', 'column', 'row dense'],
  align: 'center',
  alignItems: 'flex-end',
  alignContent: ['flex-start', 'space-around', 'space-between'],
  justify: 'center',
  justifyItems: 'flex-end',
  justifyContent: 'flex-start',
  place: 'center center',
  placeItems: 'flex-end flex-end',
  placeContent: 'flex-start flex-start',
}

describe('Prop aliases', () => {
  afterEach(cleanup)

  Object.keys(propAliases).forEach((propAliasName) => {
    describe(propAliasName, () => {
      const propValues: Array<string | number> = [].concat(
        explicitValues[propAliasName] || defaultValue,
      )

      propValues.forEach((propValue) => {
        describe(`given the value: ${propValue}`, () => {
          const props = {
            [propAliasName]: propValue,
          }
          const { container } = render(
            <Composition data-testid="composition" areas="first" {...props}>
              {({ First }) => <First>{propAliasName}</First>}
            </Composition>,
          )
          const element = getByTestId(container, 'composition')

          const { props: cssProps, transformValue } = propAliases[propAliasName]
          const expectedValue = transformValue
            ? transformValue(propValue)
            : propValue

          cssProps.forEach((cssPropName) => {
            const expectedStylesString = `${cssPropName}:${expectedValue}`

            it(`produces "${expectedStylesString}"`, () => {
              expect(element).toHaveStyle(expectedStylesString)
            })
          })
        })
      })
    })
  })
})
