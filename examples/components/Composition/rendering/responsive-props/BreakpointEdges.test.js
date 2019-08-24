describe('Breakpoint edges', () => {
  before(() => {
    cy.loadStory(
      ['components', 'composition', 'rendering', 'responsive-props'],
      ['breakpoint-edges'],
    )
  })

  const assertAreas = (areas) => {
    return cy.get('#composition').assertAreas(areas)
  }

  const assertMaxWidth = (value) => {
    return cy.get('#composition').should('have.css', 'max-width', `${value}px`)
  }

  it('Renders correctly on initial render', () => {
    assertAreas([['left', 'right']])
    assertMaxWidth(300)
  })

  it('Renders correctly at a breakpoint', () => {
    cy.setBreakpoint('sm').then(() => {
      assertAreas([['left', 'right']])
      assertMaxWidth(500)
    })
    cy.setBreakpoint('md').then(() => {
      assertAreas([['left', 'center', 'right']])
      assertMaxWidth(500)
    })
    cy.setBreakpoint('lg').then(() => {
      assertAreas([['left', 'center', 'right']])
      assertMaxWidth(600)
    })
    cy.setBreakpoint('xl').then(() => {
      assertAreas([['left', 'center', 'right']])
      assertMaxWidth(600)
    })
  })

  it('Renders correctly within a breakpoint', () => {
    // xs
    cy.setBreakpoint({ minWidth: 550 }).then(() => {
      assertAreas([['left', 'right']])
      assertMaxWidth(300)
    })

    //sm
    cy.setBreakpoint({ minWidth: 650 }).then(() => {
      assertAreas([['left', 'right']])
      assertMaxWidth(600)
    })

    // md
    cy.setBreakpoint({ minWidth: 850 }).then(() => {
      assertAreas([['left', 'center', 'right']])
      assertMaxWidth(600)
    })

    // lg
    cy.setBreakpoint({ minWidth: 1050 }).then(() => {
      assertAreas([['left', 'center', 'right']])
      assertMaxWidth(900)
    })
  })

  it('Renders correctly on the trailing edge', () => {
    // xs
    cy.setBreakpoint({ minWidth: 575 }).then(() => {
      assertAreas([['left', 'right']])
    })

    // sm
    cy.setBreakpoint({ minWidth: 767 }).then(() => {
      assertAreas([['left', 'right']])
    })

    // md
    cy.setBreakpoint({ minWidth: 991 }).then(() => {
      assertAreas([['left', 'center', 'right']])
    })

    // lg
    cy.setBreakpoint({ minWidth: 1199 }).then(() => {
      assertAreas([['left', 'center', 'right']])
    })
  })
})
