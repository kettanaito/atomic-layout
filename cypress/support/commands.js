import { assert } from 'chai'
import defaultOptions from '../../src/const/defaultOptions'
import propAliases from '../../src/const/propAliases'

Cypress.Commands.add('setBreakpoint', (breakpointName) => {
  const parsedBreakpoint = parseFloat(breakpointName)
  let breakpoint = parseFloat(breakpointName)

  if (isNaN(parsedBreakpoint)) {
    breakpoint = defaultOptions.breakpoints[breakpointName]
  }

  if (typeof breakpointName === 'object') {
    breakpoint = breakpointName
  }

  cy.viewport(
    parseFloat(breakpoint.minWidth) || 550,
    parseFloat(breakpoint.minHeight) || 550,
  )

  /**
   * Wait after viewport change due to CSS Grid repaint happening with
   * a slight human-unnoticable delay.
   */
  cy.wait(100)
})

Cypress.Commands.add('haveArea', { prevSubject: true }, (subject, gridArea) => {
  const wrapper = cy.wrap(subject)
  wrapper.should('have.css', 'grid-row-start', gridArea)
  wrapper.should('have.css', 'grid-row-end', gridArea)
  wrapper.should('have.css', 'grid-column-start', gridArea)
  wrapper.should('have.css', 'grid-column-end', gridArea)
})

Cypress.Commands.add(
  'assertPropAlias',
  {
    prevSubject: true,
  },
  (subject, propAliasName, value, exactAssertion) => {
    const wrapper = cy.wrap(subject)
    const { props: originProps, transformValue } = propAliases[propAliasName]
    const expectedValue = transformValue ? transformValue(value) : value

    originProps.forEach((originPropName) => {
      wrapper.should('have.css', originPropName).then((cssPropValue) => {
        assert(
          exactAssertion
            ? exactAssertion(cssPropValue, expectedValue, value)
            : cssPropValue === expectedValue,
          `Expected (${cssPropValue}) to equal (${expectedValue}).`,
        )

        return subject
      })
    })
  },
)

Cypress.Commands.add(
  'haveSameAxis',
  { prevSubject: true },
  (subject, axis, target) => {
    const rectA = subject[0].getBoundingClientRect()
    cy.get(target).then((elem) => {
      const rectB = elem[0].getBoundingClientRect()

      expect(rectA[axis]).to.equal(rectB[axis])

      return subject
    })
  },
)

Cypress.Commands.add(
  'notIntersectWith',
  { prevSubject: true },
  (subject, targetSelector) => {
    const a = subject[0].getBoundingClientRect()

    cy.get(targetSelector).then((elem) => {
      const b = elem[0] && elem[0].getBoundingClientRect()

      const intersectsByX = Math.max(
        0,
        Math.min(a.right, b.right) - Math.max(a.left, b.left),
      )
      const intersectsByY = Math.max(
        0,
        Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top),
      )

      const intersectionArea = intersectsByX * intersectsByY

      assert.isAtMost(intersectionArea, 0, 'Must not intersect')

      return subject
    })
  },
)
