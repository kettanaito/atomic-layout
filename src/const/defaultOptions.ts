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
export interface LayoutOptions {
  /**
   * Measurement unit that suffixes numeric prop values.
   * @example
   * <Box padding={10} />
   * // "padding: 10px"
   */
  defaultUnit: MeasurementUnit
  breakpoints: Breakpoints
  defaultBreakpointName: string
  defaultBehavior: BreakpointBehavior
}

export type BreakpointBehavior = 'up' | 'down' | 'only'

export interface Breakpoints {
  [breakpointName: string]: Breakpoint
}

export interface Breakpoint {
  [propName: string]: any
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

const defaultOptions: LayoutOptions = {
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
