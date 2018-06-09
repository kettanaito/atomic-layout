import React from 'react'
import Default from '@stories/behavior/Default'

it('Mobile first', () => {
  cy.loadStory(<Default />)

  const assertAllVisible = () => {
    cy.get('#default > div:nth-child(1)').should('be.visible')
    cy.get('#default > div:nth-child(2)').should('be.visible')
  }

  assertAllVisible()
  cy.setBreakpoint('sm').then(assertAllVisible)
  cy.setBreakpoint('md').then(assertAllVisible)
  cy.setBreakpoint('lg').then(assertAllVisible)
  cy.setBreakpoint('xl').then(assertAllVisible)
})
