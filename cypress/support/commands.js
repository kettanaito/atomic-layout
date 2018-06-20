// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { assert } from 'chai'
import defaultOptions from '../../src/const/defaultOptions'

Cypress.Commands.add('setBreakpoint', (breakpointName) => {
  const breakpoint =
    typeof breakpointName === 'string'
      ? defaultOptions.breakpoints[breakpointName]
      : breakpointName

  cy.viewport(breakpoint.minWidth || 550, breakpoint.minHeight || 550)
  cy.wait(100)
})

Cypress.Commands.add('haveArea', { prevSubject: true }, (subject, gridArea) => {
  cy.wrap(subject).should('have.css', 'grid-row-start', gridArea)
  cy.wrap(subject).should('have.css', 'grid-row-end', gridArea)
  cy.wrap(subject).should('have.css', 'grid-column-start', gridArea)
  return cy.wrap(subject).should('have.css', 'grid-column-end', gridArea)
})

Cypress.Commands.add(
  'haveSameAxis',
  { prevSubject: true },
  (subject, target, axis) => {
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
