import openBreakpoint from './openBreakpoint'

describe('openBreakpoint', () => {
  const breakpoint = openBreakpoint({
    minWidth: 300,
    maxWidth: 500,
    minHeight: 200,
    maxHeight: 400,
    minResolution: '150dpi',
    maxResolution: '300dpi',
    maxAspectRatio: '1/3',
  })

  it('sets values of all "max" properties to "undefined"', () => {
    expect(breakpoint).toHaveProperty('maxWidth', undefined)
    expect(breakpoint).toHaveProperty('maxHeight', undefined)
    expect(breakpoint).toHaveProperty('maxResolution', undefined)
    expect(breakpoint).toHaveProperty('maxAspectRatio', undefined)
  })

  it('preserves all "min" properties in the opened breakpoint', () => {
    expect(breakpoint).toHaveProperty('minWidth', 300)
    expect(breakpoint).toHaveProperty('minHeight', 200)
    expect(breakpoint).toHaveProperty('minResolution', '150dpi')
  })
})
