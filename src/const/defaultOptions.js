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

export type TMeasurementUnit = TAbsoluteUnits | TRelativeUnits
export type TLayoutOptions = {
  defaultUnit: TMeasurementUnit,
  breakpoints: {
    [breakpointName: string]: TBreakpoint,
  },
}

export type TBreakpoint = {
  minHeight?: number,
  maxHeight?: number,
  minWidth?: number,
  maxWidth?: number,
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
  breakpoints: {
    xs: {
      maxWidth: 575,
    },
    sm: {
      minWidth: 576,
      maxWidth: 768,
    },
    md: {
      minWidth: 769,
      maxWidth: 992,
    },
    lg: {
      minWidth: 993,
      maxWidth: 1199,
    },
    xl: {
      minWidth: 1200,
    },
  },
}

export default defaultOptions
