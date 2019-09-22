import applyStyles from './applyStyles'

describe('applyStyles', () => {
  describe('given arbitrary component props', () => {
    const props = {
      unknownProp: '20px',
      padding: null,
      margin: undefined,

      gap: 10,
      templateCols: '250px',
      flexDirection: 'column',
      justifyContentMd: 'flex-start',
      placeLgDown: 'baseline',
      alignItemsSmOnly: 'center',
    }
    const css = applyStyles(props)

    it('should ignore unknown props', () => {
      expect(css).not.toContain('uknownProp')
    })

    it('should ignore known props with falsy values', () => {
      expect(css).not.toContain('padding')
      expect(css).not.toContain('margin')
    })

    it('should produce CSS properties based on known props', () => {
      expect(css).toContain('flex-direction:column')
    })

    it('should apply custom transformation function to known props', () => {
      expect(css).toContain('grid-gap:10px')
      expect(css).toContain('grid-template-columns:250px')
    })

    it('should wrap responsive prop with "up" behavior in media query', () => {
      expect(css).toContain(
        '@media (min-width:768px) {justify-content:flex-start;}',
      )
    })

    it('should wrap responsive prop with "down" behavior in media query', () => {
      expect(css).toContain('@media (max-width:1199px) {place-self:baseline;}')
    })

    it('should wrap responsive prop with "only" behavior in media query', () => {
      expect(css).toContain(
        '@media (min-width:576px) and (max-width:767px) {align-items:center;}',
      )
    })
  })
})
