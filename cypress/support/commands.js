import { assert } from 'chai'
import url from 'url'
import defaultOptions from '../../src/const/defaultOptions'

Cypress.Commands.add('loadStory', (storyGroup, storyPath) => {
  const storyUrl = url.format({
    pathname: '/iframe.html',
    query: {
      path: [
        '/story',
        [storyGroup, storyPath.join('--')].filter(Boolean).join('-'),
      ].join('/'),
    },
  })

  cy.visit(storyUrl)
})

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

Cypress.Commands.add('haveTag', { prevSubject: true }, (subject, tagName) => {
  cy.wrap(subject).then(($elem) => {
    assert($elem.is(tagName), `Renders as "<${tagName}>"`)
  })
})

Cypress.Commands.add('haveArea', { prevSubject: true }, (subject, gridArea) => {
  const wrapper = cy.wrap(subject)
  wrapper.should('have.css', 'grid-row-start', gridArea)
  wrapper.should('have.css', 'grid-row-end', gridArea)
  wrapper.should('have.css', 'grid-column-start', gridArea)
  wrapper.should('have.css', 'grid-column-end', gridArea)
})

Cypress.Commands.add(
  'haveSameAxis',
  { prevSubject: true },
  (subject, axis, targetSelector) => {
    console.warn('haveSameAxis', subject, axis, targetSelector)

    const rectA = subject[0].getBoundingClientRect()
    cy.get(targetSelector).then((elem) => {
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

    cy.log(
      `Assert no intersection between "#${
        subject[0].id
      }" and "${targetSelector}"`,
    )
      .get(targetSelector)
      .then((element) => {
        const b = element[0] && element[0].getBoundingClientRect()

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

//
// New set of commands
//
import assertAreas from './commands/assertAreas'

Cypress.Commands.add('assertAreas', { prevSubject: true }, function(
  subject,
  areasMatrix,
) {
  // const wrapper = cy.wrap(subject)
  assertAreas(areasMatrix, subject.selector)
})
