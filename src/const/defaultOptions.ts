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
  /**
   * A function that produces tag-based styles (i.e. `produceStyles.div`)
   * of the CSS-in-JS solution of your choice.
   * @example
   * import styled from 'styled-components'
   * produceStyles: styled
   */
  produceStyles: any /** @todo Type this */
  /**
   * Measurement unit that suffixes numeric prop values.
   * @default "px"
   * @example
   * <Box padding={10} />
   * // "padding: 10px"
   */
  defaultUnit: MeasurementUnit
  /**
   * Map of layout breakpoints.
   * @default Bootstrap4
   * @see https://getbootstrap.com/docs/4.0/layout/grid/#grid-options
   */
  breakpoints: Breakpoints
  /**
   * Breakpoint name to use when no explicit breakpoint
   * name is specified in a prop name.
   * @default "xs"
   */
  defaultBreakpointName: string
  /**
   * Default behavior of responsive props application.
   * @default "up" (mobile-first)
   */
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
  /* Index signature for dynamic breakpoint composition */
  [propName: string]: any
}

import styled from 'styled-components'

const defaultOptions: LayoutOptions = {
  /**
   * @todo Do not import "styled-component"
   * That makes it a dependency of "atomic-layout".
   * Find a way to ship default behavior without requiring
   * to have a potentially opt-out module as a dependency.
   */
  produceStyles: styled,
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
