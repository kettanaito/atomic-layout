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
import { mount } from 'cypress-react-unit-test'
import defaultOptions from '../../src/const/defaultOptions'

Cypress.Commands.add('loadStory', (story) => mount(story))
Cypress.Commands.add('setBreakpoint', (breakpointName) => {
  const breakpoint = defaultOptions.breakpoints[breakpointName]
  return cy.viewport(breakpoint.minWidth || 550, breakpoint.minHeight || 550)
})
