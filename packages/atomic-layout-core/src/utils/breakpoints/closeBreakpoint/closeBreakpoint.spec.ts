import closeBreakpoint from './closeBreakpoint'

describe('closeBreakpoint', () => {
  describe('given numeric breakpoints', () => {
    const breakpoint = closeBreakpoint({
      minHeight: 350,
      maxHeight: 700,
      minWidth: 500,
      maxWidth: 621,
    })

    it('should not contain original "min-" properties', () => {
      expect(breakpoint).not.toContain(['minHeight', 'minWidth'])
    })

    it('should coerce "max-" properties into {min} - 1', () => {
      expect(breakpoint).toHaveProperty('maxHeight', 349)
      expect(breakpoint).toHaveProperty('maxWidth', 499)
    })
  })

  describe('given custom measurement unit', () => {
    const breakpoint = closeBreakpoint({
      minHeight: '350px',
      maxHeight: '700px',
      minWidth: '500px',
      maxWidth: '621px',
    })

    it('should not contain original "min-" properties', () => {
      expect(breakpoint).not.toContain(['minHeight', 'minWidth'])
    })

    it('should coerce "max-" properties into {min} - 1 + unit', () => {
      expect(breakpoint).toHaveProperty('maxHeight', '349px')
      expect(breakpoint).toHaveProperty('maxWidth', '499px')
    })
  })
})
