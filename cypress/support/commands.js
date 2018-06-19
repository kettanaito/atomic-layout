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
import defaultOptions from '../../src/const/defaultOptions'
// import examplesWebpackConfig from '../../examples/webpack.config'

Cypress.Commands.add('setBreakpoint', (breakpointName) => {
  const breakpoint =
    typeof breakpointName === 'string'
      ? defaultOptions.breakpoints[breakpointName]
      : breakpointName

  return cy.viewport(breakpoint.minWidth || 550, breakpoint.minHeight || 550)
})

Cypress.Commands.add('assert', (elements, expectation) => {
  cy.wait(10)
  elements.forEach((elementSelector) => {
    cy.get(elementSelector).should(expectation)
  })
})

Cypress.Commands.add('assertArea', (selector, gridArea) => {
  cy.get(selector).should('have.css', 'grid-row-start', gridArea)
  cy.get(selector).should('have.css', 'grid-row-end', gridArea)
  cy.get(selector).should('have.css', 'grid-column-start', gridArea)
  cy.get(selector).should('have.css', 'grid-column-end', gridArea)
})
