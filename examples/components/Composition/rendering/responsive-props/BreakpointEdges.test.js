describe('Breakpoint edges', () => {
  before(() => {
    cy.loadStory(
      ['components', 'composition', 'rendering', 'responsive-props'],
      ['breakpoint-edges'],
    )
  })

  const assertMaxWidth = (value) => {
    return cy.get('#composition').should('have.css', 'max-width', value)
  }

  it('Renders correctly on initial render', () => {
    assertMaxWidth('200px')
  })

  it('Renders correctly at a breakpoint', () => {
    cy.setBreakpoint('sm').then(() => {
      assertMaxWidth('400px')
    })
    cy.setBreakpoint('md').then(() => {
      assertMaxWidth('400px')
    })
    cy.setBreakpoint('lg').then(() => {
      assertMaxWidth('100%')
    })
    cy.setBreakpoint('xl').then(() => {
      assertMaxWidth('100%')
    })
  })

  it('Renders correctly within a breakpoint', () => {
    // xs
    cy.setBreakpoint({ minWidth: 550 }).then(() => {
      assertMaxWidth('200px')
    })

    //sm
    cy.setBreakpoint({ minWidth: 650 }).then(() => {
      assertMaxWidth('400px')
    })

    // md
    cy.setBreakpoint({ minWidth: 850 }).then(() => {
      assertMaxWidth('400px')
    })

    // lg
    cy.setBreakpoint({ minWidth: 1050 }).then(() => {
      assertMaxWidth('100%')
    })

    // xl
    cy.setBreakpoint({ minWidth: 1400 }).then(() => {
      assertMaxWidth('100%')
    })
  })

  it('Renders correctly on the trailing edge', () => {
    // xs
    cy.setBreakpoint({ minWidth: 575 }).then(() => {
      assertMaxWidth('200px')
    })

    // sm
    cy.setBreakpoint({ minWidth: 576 }).then(() => {
      assertMaxWidth('400px')
    })
    cy.setBreakpoint({ minWidth: 767 }).then(() => {
      assertMaxWidth('400px')
    })

    // md
    cy.setBreakpoint({ minWidth: 768 }).then(() => {
      assertMaxWidth('400px')
    })
    cy.setBreakpoint({ minWidth: 991 }).then(() => {
      assertMaxWidth('400px')
    })

    // lg
    cy.setBreakpoint({ minWidth: 992 }).then(() => {
      assertMaxWidth('100%')
    })
    cy.setBreakpoint({ minWidth: 1199 }).then(() => {
      assertMaxWidth('100%')
    })

    // xl
    cy.setBreakpoint({ minWidth: 1200 }).then(() => {
      assertMaxWidth('100%')
    })
  })
})
