// @flow
type TAbsoluteUnits = 'cm' | 'mm' | 'in' | 'px' | 'pt' | 'pc'
type TRelativeUnits =
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
export type TMeasurementUnit = TAbsoluteUnits | TRelativeUnits
export type TLayoutOptions = {
  defaultUnit: TMeasurementUnit,
  breakpoints: TBreakpoints,
  defaultBreakpointName: string,
  defaultBehavior: TBreakpointBehavior,
}

export type TBreakpoints = {
  [breakpointName: string]: TBreakpoint,
}

export type TBreakpoint = {
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

export type TBreakpointBehavior = 'up' | 'down' | 'only'

const defaultOptions: TLayoutOptions = {
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
