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
export { GenericProps } from './const/props'
export { AreasMap } from './utils/templates/generateComponents'

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
export { default as parsePropName } from './utils/strings/parsePropName'
export { default as parseTeplates } from './utils/templates/parseTemplates'

/* Utilities */
export { default as warn } from './utils/functions/warn'
