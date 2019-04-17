import propAliases, { PropAliases } from './propAliases'

type AbsoluteUnits = 'cm' | 'mm' | 'in' | 'px' | 'pt' | 'pc'
type RelativeUnits =
  | '%'
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'

export type Numeric = number | string
export type MeasurementUnit = AbsoluteUnits | RelativeUnits
export type BreakpointBehavior = 'up' | 'down' | 'only'
export interface Breakpoints {
  [breakpointName: string]: Breakpoint
}

export interface LayoutOptions {
  propAliases: PropAliases
  /**
   * Measurement unit that suffixes numeric prop values.
   * @default "px"
   * @example
   * <Box padding={10} />
   * @returns "padding: 10px"
   */
  defaultUnit: MeasurementUnit
  /**
   * Map of layout breakpoints.
   */
  breakpoints: Breakpoints
  /**
   * Breakpoint name to use when no explicit breakpoint
   * name is specified in a prop name.
   * @default "xs"
   */
  defaultBreakpointName: string
  defaultBehavior: BreakpointBehavior
}

export interface MediaQuery {
  minHeight?: Numeric
  maxHeight?: Numeric
  minWidth?: Numeric
  maxWidth?: Numeric
  minResolution?: string
  maxResolution?: string
  aspectRatio?: string
  minAspectRatio?: string
  maxAspectRatio?: string
  scan?: 'interlace' | 'progressive'
  orientation?: 'portrait' | 'landscape'
  displayMode?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'
}

export interface Breakpoint extends MediaQuery {
  // Index signature for dynamic breakpoint composition
  [propName: string]: any
}

const defaultOptions: LayoutOptions = {
  propAliases,
  defaultUnit: 'px',
  defaultBehavior: 'up',
  defaultBreakpointName: 'xs',
  breakpoints: {
    xs: {
      maxWidth: '575px',
    },
    sm: {
      minWidth: '576px',
      maxWidth: '768px',
    },
    md: {
      minWidth: '769px',
      maxWidth: '992px',
    },
    lg: {
      minWidth: '993px',
      maxWidth: '1199px',
    },
    xl: {
      minWidth: '1200px',
    },
  },
}

export default defaultOptions
