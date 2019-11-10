/**
 * Configuration
 */
describe('Configuration', () => {
  require('./configuration/CustomUnit.test')
  require('./configuration/CustomBreakpoints.test')
})

/**
 * Components
 */
describe('Components', () => {
  describe('Box', () => {
    require('./components/Box/DisplayOverride.test')
  })

  describe('Composition', () => {
    describe('Declaration', () => {
      require('./components/Composition/declaration/TemplateIndentation.test')
      require('./components/Composition/declaration/TemplatePeriod.test')
      require('./components/Composition/declaration/Templateless.test')
      require('./components/Composition/declaration/GridTemplate.test')
    })

    describe('Rendering', () => {
      require('./components/Composition/rendering/NamespaceCollision.test')
      require('./components/Composition/rendering/NestedComposition.test')
      require('./components/Composition/rendering/WeakAreas.test')

      describe('Behaviors', () => {
        require('./components/Composition/rendering/behaviors/MobileFirst.test')
        require('./components/Composition/rendering/behaviors/Bell.test')
        require('./components/Composition/rendering/behaviors/Notch.test')
      })

      describe('Responsive props', () => {
        require('./components/Composition/rendering/responsive-props/MobileFirst.test')
        require('./components/Composition/rendering/responsive-props/InclusiveNotch.test')
        require('./components/Composition/rendering/responsive-props/BreakpointSpecific.test')
        require('./components/Composition/rendering/responsive-props/BreakpointEdges.test')
      })
    })
  })

  describe('Only', () => {
    require('./components/Only/OnlyDefaultBehavior.test')
    require('./components/Only/OnlyCustomBreakpoints.test')
  })

  describe('Visible', () => {
    require('./components/Visible/Visible.test')
  })
})

/**
 * Hooks
 */
describe('Hooks', () => {
  require('./hooks/useViewportChange.test')
  require('./hooks/useBreakpointChange.test')
  require('./hooks/useResponsiveValue.test')
  require('./hooks/useResponsiveProps.test')
  require('./hooks/useResponsiveComponent.test')
})

/**
 * Semantics
 */
describe('Semantics', () => {
  require('./semantics/PolymorphicProp.test')
})

/**
 * Recipes
 */
describe('Recipes', () => {
  require('./recipes/IterativeAreas.test')
})

/**
 * Regression tests
 */
describe('Regression tests', () => {
  require('./regression/StylesUndefined.test')
})
