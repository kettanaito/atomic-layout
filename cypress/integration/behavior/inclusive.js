import React from 'react'
import Inclusive from '@stories/behavior/Inclusive'

it('Inclusive', () => {
  cy.loadStory(<Inclusive />)

  const assertAllVisible = () => {
    cy.get('#inclusive > div:nth-child(1)').should('be.visible')
    cy.get('#inclusive > div:nth-child(2)').should('be.visible')
    cy.get('#inclusive > div:nth-child(3)').should('be.visible')
  }

  cy.get('#inclusive > div:nth-child(1)').should('be.visible')
  cy.get('#inclusive > div:nth-child(2)').should('be.visible')
  cy.get('#inclusive > div:nth-child(3)').should('not.be.visible')

  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(() => {
    cy.get('#inclusive > div:nth-child(1)').should('be.visible')
    cy.get('#inclusive > div:nth-child(2)').should('be.visible')
    cy.get('#inclusive > div:nth-child(3)').should('not.be.visible')
  })
  cy.setBreakpoint('xl').then(() => {
    cy.get('#inclusive > div:nth-child(1)').should('be.visible')
    cy.get('#inclusive > div:nth-child(2)').should('be.visible')
    cy.get('#inclusive > div:nth-child(3)').should('not.be.visible')
  })
})
