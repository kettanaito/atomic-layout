// @flow
type AbsoluteUnits = 'cm' | 'mm' | 'in' | 'px' | 'pt' | 'pc'
type RelativeUnits =
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | '%'

export type Numeric = number | string
export type MeasurementUnit = AbsoluteUnits | RelativeUnits
export type LayoutOptions = {
  defaultUnit: MeasurementUnit,
  breakpoints: Breakpoints,
  defaultBreakpointName: string,
  defaultBehavior: TBreakpointBehavior,
}

export type Breakpoints = {
  [breakpointName: string]: Breakpoint,
}

export type Breakpoint = {
  minHeight?: Numeric,
  maxHeight?: Numeric,
  minWidth?: Numeric,
  maxWidth?: Numeric,
  minResolution?: string,
  maxResolution?: string,
  aspectRatio?: string,
  minAspectRatio?: string,
  maxAspectRatio?: string,
  scan?: 'interlace' | 'progressive',
  orientation?: 'portrait' | 'landscape',
  displayMode?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser',
}

export type BreakpointBehavior = 'up' | 'down' | 'only'

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
