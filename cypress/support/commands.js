import { assert } from 'chai'
import url from 'url'
import { defaultOptions } from '@atomic-layout/core'

Cypress.Commands.add('loadStory', (storyGroup, storyPath) => {
  const storyUrl = url.format({
    pathname: '/iframe.html',
    query: {
      path: [
        '/story',
        [storyGroup.join('-'), storyPath.join('--')].filter(Boolean).join('--'),
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
    parseFloat(breakpoint.minWidth) || 500,
    parseFloat(breakpoint.minHeight) || 500,
  )

  /**
   * Wait after viewport change due to CSS Grid repaint happening with
   * a slight human-unnoticable delay.
   */
  cy.wait(100)
})

Cypress.Commands.add('haveTag', { prevSubject: true }, (subject, tagName) => {
  cy.wrap(subject).then(($element) => {
    assert($element.is(tagName), `Renders as "<${tagName}>"`)
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
    cy.log(
      `Assert same ${axis} axis between "${subject.selector}" and "${targetSelector}"`,
    )

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
      `Assert no intersection between "#${subject[0].id}" and "${targetSelector}"`,
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

Cypress.Commands.add('shouldRender', function(selector, shouldRender = true) {
  return cy
    .get(selector)
    .should([!shouldRender && 'not', 'be', 'visible'].filter(Boolean).join('.'))
})

Cypress.Commands.add('assertAreas', { prevSubject: true }, function(
  subject,
  areasMatrix,
) {
  assertAreas(areasMatrix, subject.selector)
})

Cypress.Commands.add('assertNotch', { prevSubject: true }, function(subject) {
  cy.log(`Assert "${subject.selector}" behaves as Notch`)

  const assertAllVisible = () => {
    cy.wrap(subject).assertAreas([['left', 'center', 'right']])
  }

  const assertCenterHidden = () => {
    cy.wrap(subject).assertAreas([['left', 'right']])
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertCenterHidden)
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
})

Cypress.Commands.add('assertBell', { prevSubject: true }, function(subject) {
  cy.log(`Assert "${subject.selector}" behaves as Bell`)

  const assertAllVisible = () => {
    cy.wrap(subject).assertAreas([['first', 'second', 'third']])
  }

  const assertThirdHidden = () => {
    cy.wrap(subject).assertAreas([['first', 'second', false]])
  }

  assertThirdHidden()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(assertThirdHidden)
  cy.setBreakpoint('lg').then(assertThirdHidden)
})
