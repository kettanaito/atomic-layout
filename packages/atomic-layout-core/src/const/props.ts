import { Numeric } from './defaultOptions'
import { AreasMap } from '../utils/templates/generateComponents'

type CSSGlobalValues = 'inherit' | 'initial' | 'unset'

type FlexboxBasicAlignment =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  // Combinations
  | 'center center'
  | 'center start'
  | 'center end'
  | 'center flex-start'
  | 'center flex-end'
  | 'start center'
  | 'start start'
  | 'start end'
  | 'start flex-start'
  | 'start flex-end'
  | 'end center'
  | 'end start'
  | 'end end'
  | 'end flex-start'
  | 'end flex-end'
  | 'flex-start center'
  | 'flex-start start'
  | 'flex-start end'
  | 'flex-start flex-start'
  | 'flex-start flex-end'
  | 'flex-end center'
  | 'flex-end start'
  | 'flex-end end'
  | 'flex-end flex-start'
  | 'flex-end flex-end'

type FlexboxBaselineAlignment = 'baseline' | 'fist baseline' | 'last baseline'

type FlexboxDistributedAlignment =
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'

type FlexboxSelfAlignment = 'self-start' | 'self-end'
type FlexboxOverflowAlignment = 'safe center' | 'unsafe center'

export interface GenericProps {
  /**
   * Specifies direction of flex-items
   * @css `flex-direction`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
   */
  flexDirection?: string
  /**
   * Specifies the flex shrink factor.
   * @css `flex-shrink`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
   */
  flexShrink?: string
  /**
   * Specifies the flex grow factor.
   * @css `flex-grow`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
   */
  flexGrow?: string
  /**
   * Specifies if the flex items are forced
   * in a single line or multiple lines.
   * @css `flex-wrap`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
   */
  flexWrap?: string
  /**
   * Aligns flex items of the current flex.
   * @css `align-self`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
   */
  align?:
    | 'auto'
    | 'normal'
    | 'stretch'
    | FlexboxBasicAlignment
    | FlexboxBaselineAlignment
    | FlexboxSelfAlignment
    | FlexboxOverflowAlignment
    | CSSGlobalValues
  /**
   * Aligns direct children as a group.
   * @css `align-items`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
   */
  alignItems?:
    | 'normal'
    | 'stretch'
    | FlexboxBasicAlignment
    | FlexboxBaselineAlignment
    | FlexboxSelfAlignment
    | FlexboxOverflowAlignment
    | CSSGlobalValues
  /**
   * Distributes space around and between content items.
   * @css `align-content`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
   */
  alignContent?:
    | 'stretch'
    | FlexboxBasicAlignment
    | FlexboxBaselineAlignment
    | FlexboxDistributedAlignment
    | FlexboxOverflowAlignment
    | CSSGlobalValues
  /**
   * Justifies a box inside its alignment container.
   * @css `justify-self`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self
   */
  justify?:
    | 'stretch'
    | FlexboxBasicAlignment
    | FlexboxBaselineAlignment
    | FlexboxSelfAlignment
    | FlexboxOverflowAlignment
    | CSSGlobalValues
  /**
   * Justifies direct children.
   * @css `justify-items`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
   */
  justifyItems?:
    | 'auto'
    | 'stretch'
    | FlexboxBasicAlignment
    | FlexboxSelfAlignment
    | FlexboxBaselineAlignment
    | FlexboxOverflowAlignment
    | CSSGlobalValues
  /**
   * Justifies space between and around content items along the main axis.
   * @css `justify-content`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
   */
  justifyContent?:
    | 'normal'
    | 'stretch'
    | FlexboxBasicAlignment
    | FlexboxSelfAlignment
    | FlexboxDistributedAlignment
    | FlexboxOverflowAlignment

  place?:
    | 'auto'
    | 'normal'
    | CSSGlobalValues
    | FlexboxBasicAlignment
    | FlexboxBaselineAlignment

  /**
   * Shorthand for `align-items` and `justify-items`.
   * @css `place-items`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/place-items
   */
  placeItems?:
    | 'auto'
    | 'normal'
    | FlexboxBasicAlignment
    | FlexboxSelfAlignment
    | FlexboxBaselineAlignment
    | CSSGlobalValues
  /**
   * Shorthand for `align-content` and `justify-content`.
   * @css `place-content`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/place-content
   */
  placeContent?:
    | 'stretch'
    | FlexboxBasicAlignment
    | FlexboxBaselineAlignment
    | FlexboxDistributedAlignment
    | CSSGlobalValues

  height?: Numeric
  minHeight?: Numeric
  maxHeight?: Numeric
  width?: Numeric
  minWidth?: Numeric
  maxWidth?: Numeric

  margin?: Numeric
  marginTop?: Numeric
  marginRight?: Numeric
  marginBottom?: Numeric
  marginLeft?: Numeric
  /**
   * Shorthand for `margin-top` and `margin-bottom`.
   */
  marginVertical?: Numeric
  /**
   * Shorthand for `margin-right` and `margin-left`.
   */
  marginHorizontal?: Numeric

  padding?: Numeric
  paddingTop?: Numeric
  paddingRight?: Numeric
  paddingBottom?: Numeric
  paddingLeft?: Numeric
  /**
   * Shorthand for `padding-top` and `padding-bottom`.
   */
  paddingVertical?: Numeric
  /**
   * Shorthand for `padding-right` and `padding-left`.
   */
  paddingHorizontal?: Numeric
}

export interface GridProps {
  /**
   * Grid area.
   * @css `grid-area`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area
   */
  area?: string
  /**
   * Grid areas.
   * @css `grid-template-areas`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
   */
  areas?: string
  /**
   * Grid template that describes rows, columns and areas.
   * @css `grid-template`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template
   */
  template?: string
  /**
   * @css `grid-template-columns`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  templateCols?: string
  /**
   * @css `grid-template-rows`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
   */
  templateRows?: string
  /**
   * Shorthand for `grid-column-start` and `grid-column-end` specifying a grid item's
   * size and location within the grid column.
   * @css `grid-column`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
   */
  col?: 'auto' | string
  /**
   * Grid item's start position within the grid column.
   * @css `grid-column-start`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
   */
  colStart?: string
  /**
   * Grid item's end position within the grid column.
   * @css `grid-column-end`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
   */
  colEnd?: string
  /**
   * Shorthand for `grid-row-start` and `grid-row-end` specifying a grid item's
   * size and location within the grid row.
   * @css `grid-row`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
   */
  row?: 'auto' | string
  /**
   * Grid item's start position within the grid row.
   * @css `grid-row-start`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start
   */
  rowStart?: string
  /**
   * Grid item's end position within the grid row.
   * @css `grid-row-end`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end
   */
  rowEnd?: string
  /**
   * Spacing between rows and columns.
   * @css `grid-gap`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap
   */
  gap?: Numeric
  /**
   * Spacing between the grid columns.
   * @css `grid-column-gap`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-gap
   */
  gapCol?: Numeric
  /**
   * Spacing between the grid rows.
   * @css `grid-row-gap`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-gap
   */
  gapRow?: Numeric
  /**
   * Spacing between rows and columns.
   * @css `grid-gap`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap
   */
  gutter?: Numeric
  /**
   * Spacing between the grid columns.
   * @css `grid-column-gap`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-gap
   */
  gutterCol?: Numeric
  /**
   * Spacing between the grid rows.
   * @css `grid-row-gap`
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-gap
   */
  gutterRow?: Numeric
  /**
   * Size of implicitly created rows
   * @css grid-auto-rows
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows
   */
  autoRows?: Numeric
  /**
   * Size of implicitly created columns
   * @css grid-auto-columns
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
   */
  autoCols?: Numeric
  /**
   * Flow of auto-placed items
   * @css grid-auto-flow
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
   */
  autoFlow?: string
}

export interface BoxProps extends GenericProps {
  [propName: string]: any
  flex?: boolean
  inline?: boolean
}

export type CompositionRenderProp = (areas: AreasMap) => React.ReactNode

export interface CompositionProps extends GenericProps, GridProps {
  [propName: string]: any
  children: CompositionRenderProp | React.ReactNode
  inline?: boolean
}
