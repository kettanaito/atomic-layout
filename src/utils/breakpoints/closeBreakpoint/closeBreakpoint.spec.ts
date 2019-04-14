import closeBreakpoint from './closeBreakpoint'

describe('closeBreakpoint', () => {
  it('closes a given breakpoint', () => {
    const breakpoint = {
      minWidth: 500,
      maxWidth: 621,
      minHeight: 350,
      maxHeight: 700,
    }

    expect(closeBreakpoint(breakpoint)).toEqual({
      maxHeight: 349,
      maxWidth: 499,
    })
  })
})
