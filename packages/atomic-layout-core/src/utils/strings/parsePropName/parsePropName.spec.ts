import Layout from '../../../Layout'
import parsePropName from './parsePropName'

describe('parsePropName', () => {
  it('parses a prop name without breakpoint or behavior', () => {
    expect(parsePropName('gutter')).toEqual({
      originPropName: 'gutter',
      purePropName: 'gutter',
      behavior: 'up',
      breakpoint: {
        name: 'xs',
        isDefault: true,
      },
    })
  })

  it('parses a prop name with breakpoint without behavior', () => {
    expect(parsePropName('gutterMd')).toEqual({
      originPropName: 'gutterMd',
      purePropName: 'gutter',
      behavior: 'up',
      breakpoint: {
        name: 'md',
        isDefault: false,
      },
    })
  })

  it('parses prop name with behavior and without breakpoint', () => {
    expect(parsePropName('gutterDown')).toEqual({
      originPropName: 'gutterDown',
      purePropName: 'gutter',
      behavior: 'down',
      breakpoint: {
        name: 'xs',
        isDefault: true,
      },
    })
  })

  it('parses a prop name with a breakpoint and behavior', () => {
    expect(parsePropName('gutterLgOnly')).toEqual({
      originPropName: 'gutterLgOnly',
      purePropName: 'gutter',
      behavior: 'only',
      breakpoint: {
        name: 'lg',
        isDefault: false,
      },
    })

    expect(parsePropName('paddingVerticalMdDown')).toEqual({
      originPropName: 'paddingVerticalMdDown',
      purePropName: 'paddingVertical',
      behavior: 'down',
      breakpoint: {
        name: 'md',
        isDefault: false,
      },
    })
  })

  it('ignores valid breakpoint written in lowercase', () => {
    expect(parsePropName('guttermd')).toEqual({
      originPropName: 'guttermd',
      purePropName: 'guttermd',
      behavior: 'up',
      breakpoint: {
        name: 'xs',
        isDefault: true,
      },
    })
  })

  it('ignores valid behavior written in lowercase', () => {
    expect(parsePropName('gutterdown')).toEqual({
      originPropName: 'gutterdown',
      purePropName: 'gutterdown',
      behavior: 'up',
      breakpoint: {
        name: 'xs',
        isDefault: true,
      },
    })
  })

  it('ignores valid breakpoint and behavior written in lowercase', () => {
    expect(parsePropName('gutterlgdown')).toEqual({
      originPropName: 'gutterlgdown',
      purePropName: 'gutterlgdown',
      behavior: 'up',
      breakpoint: {
        name: 'xs',
        isDefault: true,
      },
    })
  })

  it('ignores unknown suffixes', () => {
    expect(parsePropName('gutterFoo')).toEqual({
      originPropName: 'gutterFoo',
      purePropName: 'gutterFoo',
      behavior: 'up',
      breakpoint: {
        name: 'xs',
        isDefault: true,
      },
    })
  })

  describe('with custom layout breakpoints', () => {
    beforeAll(() => {
      Layout.configure({
        defaultBreakpointName: 'mobile',
        breakpoints: {
          mobile: {},
          tablet: {},
          desktopRetina: {},
        },
      })
    })

    it('parses a prop name without breakpoint or behavior', () => {
      expect(parsePropName('marginLeft')).toEqual({
        originPropName: 'marginLeft',
        purePropName: 'marginLeft',
        behavior: 'up',
        breakpoint: {
          name: 'mobile',
          isDefault: true,
        },
      })
    })

    it('parses a prop name with custom breakpoint and without behavior', () => {
      expect(parsePropName('templateTablet')).toEqual({
        originPropName: 'templateTablet',
        purePropName: 'template',
        behavior: 'up',
        breakpoint: {
          name: 'tablet',
          isDefault: false,
        },
      })

      expect(parsePropName('widthDesktopRetina')).toEqual({
        originPropName: 'widthDesktopRetina',
        purePropName: 'width',
        behavior: 'up',
        breakpoint: {
          name: 'desktopRetina',
          isDefault: false,
        },
      })
    })

    it('parses a prop name with behavior without breakpoint', () => {
      expect(parsePropName('templateOnly')).toEqual({
        originPropName: 'templateOnly',
        purePropName: 'template',
        behavior: 'only',
        breakpoint: {
          name: 'mobile',
          isDefault: true,
        },
      })
    })

    it('parses a prop name with custom breakpoint and behavior', () => {
      expect(parsePropName('paddingHorizontalDesktopRetinaDown')).toEqual({
        originPropName: 'paddingHorizontalDesktopRetinaDown',
        purePropName: 'paddingHorizontal',
        behavior: 'down',
        breakpoint: {
          name: 'desktopRetina',
          isDefault: false,
        },
      })
    })

    it('ignores unknown suffixes', () => {
      expect(parsePropName('gutterFoo')).toEqual({
        originPropName: 'gutterFoo',
        purePropName: 'gutterFoo',
        behavior: 'up',
        breakpoint: {
          name: 'mobile',
          isDefault: true,
        },
      })
    })
  })
})
