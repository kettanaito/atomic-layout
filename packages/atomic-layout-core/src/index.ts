import Layout from './Layout'
export default Layout

export { default as defaultOptions } from './const/defaultOptions'

/* Typings */
export {
  Numeric,
  MediaQuery,
  Breakpoint,
  BreakpointBehavior,
} from './const/defaultOptions'
export { GenericProps, BoxProps, GridProps } from './const/props'

/* Styles */
export { default as applyStyles } from './utils/styles/applyStyles'
export {
  default as createMediaQuery,
  joinQueryList,
} from './utils/styles/createMediaQuery'
export { default as normalizeQuery } from './utils/styles/normalizeQuery'

/* Breakpoints */
export { default as withBreakpoints } from './utils/breakpoints/withBreakpoints'
export { default as openBreakpoint } from './utils/breakpoints/openBreakpoint'
export { default as closeBreakpoint } from './utils/breakpoints/closeBreakpoint'
export { default as mergeAreaRecords } from './utils/breakpoints/mergeAreaRecords'

/* Props */
export {
  default as propAliases,
  PropAliases,
  PropAliasDeclaration,
} from './const/propAliases'
export { default as parsePropName } from './utils/strings/parsePropName'
export { default as parseTemplates } from './utils/templates/parseTemplates'
export {
  default as generateComponents,
  AreasMap,
  AreaComponent,
} from './utils/templates/generateComponents'

/* Utilities */
export { default as warn } from './utils/functions/warn'
