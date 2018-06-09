import React from 'react'
import Bell from '@stories/behavior/Bell'

it('Bell', () => {
  cy.loadStory(<Bell />)

  const assertAllVisible = () => {
    cy.get('#bell > div:nth-child(1)').should('be.visible')
    cy.get('#bell > div:nth-child(2)').should('be.visible')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(() => {
    cy.get('#bell > div:nth-child(1)').should('be.visible')
    cy.get('#bell > div:nth-child(2)').should('not.be.visible')
  })
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
})
