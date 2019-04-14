import { Numeric } from '@const/defaultOptions'
import compose from '@utils/functions/compose'
import transformNumeric from '@utils/math/transformNumeric'
import sanitizeTemplateArea from '@utils/strings/sanitizeTemplateArea'

export type ValueTransformer<Input, Return> = (value: Input) => Return

interface PropAlias {
  output: string[]
  transformValue?: ValueTransformer<Numeric, string>
}

export interface PropAliases {
  [aliasName: string]: PropAlias
}

type TransformTemplateString = (template: string) => string
const transformTemplateString: TransformTemplateString = compose(
  (areas: string[]) => areas.join('\n'),
  (areas: string[]) => areas.map(sanitizeTemplateArea),
  (template: string) => template.split('\n'),
  (template: string) => template.trim(),
)

/**
 * Collection of prop aliases.
 * Prop alias is a prop name accepted by a component which is later
 * substituted by one or multiple CSS properties with a single value.
 * Each prop value can have a value transformer.
 */
const propAliases: PropAliases = {
  /* CSS Grid */
  area: {
    output: ['grid-area'],
  },
  areas: {
    output: ['grid-template-areas'],
    transformValue: transformTemplateString,
  },
  template: {
    output: ['grid-template'],
    transformValue: transformTemplateString,
  },
  templateCols: {
    output: ['grid-template-columns'],
  },
  templateRows: {
    output: ['grid-template-rows'],
  },
  col: {
    output: ['grid-column'],
  },
  colStart: {
    output: ['grid-column-start'],
  },
  colEnd: {
    output: ['grid-column-end'],
  },
  row: {
    output: ['grid-row'],
  },
  rowStart: {
    output: ['grid-row-start'],
  },
  rowEnd: {
    output: ['grid-row-end'],
  },
  gap: {
    output: ['grid-gap'],
    transformValue: transformNumeric,
  },
  gapCol: {
    output: ['grid-column-gap'],
    transformValue: transformNumeric,
  },
  gapRow: {
    output: ['grid-row-gap'],
    transformValue: transformNumeric,
  },
  gutter: {
    output: ['grid-gap'],
    transformValue: transformNumeric,
  },
  gutterCol: {
    output: ['grid-column-gap'],
    transformValue: transformNumeric,
  },
  gutterRow: {
    output: ['grid-row-gap'],
    transformValue: transformNumeric,
  },
  autoRows: {
    output: ['grid-auto-rows'],
    transformValue: transformNumeric,
  },
  autoCols: {
    output: ['grid-auto-columns'],
    transformValue: transformNumeric,
  },
  autoFlow: {
    output: ['grid-auto-flow'],
  },
  align: {
    output: ['align-self'],
  },
  alignItems: {
    output: ['align-items'],
  },
  justify: {
    output: ['justify-self'],
  },
  justifyItems: {
    output: ['justify-items'],
  },
  justifyContent: {
    output: ['justify-content'],
  },
  place: {
    output: ['place-self'],
  },
  placeItems: {
    output: ['place-items'],
  },
  placeContent: {
    output: ['place-content'],
  },

  /* CSS Flexbox */
  flexDirection: {
    output: ['flex-direction'],
  },
  flexShrink: {
    output: ['flex-shrink'],
  },
  flexGrow: {
    output: ['flex-grow'],
  },
  flexWrap: {
    output: ['flex-wrap'],
  },

  /* Dimensions */
  height: {
    output: ['height'],
    transformValue: transformNumeric,
  },
  minHeight: {
    output: ['min-height'],
    transformValue: transformNumeric,
  },
  maxHeight: {
    output: ['max-height'],
    transformValue: transformNumeric,
  },
  width: {
    output: ['width'],
    transformValue: transformNumeric,
  },
  minWidth: {
    output: ['min-width'],
    transformValue: transformNumeric,
  },
  maxWidth: {
    output: ['max-width'],
    transformValue: transformNumeric,
  },

  /* Spacing */
  margin: {
    output: ['margin'],
    transformValue: transformNumeric,
  },
  marginTop: {
    output: ['margin-top'],
    transformValue: transformNumeric,
  },
  marginRight: {
    output: ['margin-right'],
    transformValue: transformNumeric,
  },
  marginBottom: {
    output: ['margin-bottom'],
    transformValue: transformNumeric,
  },
  marginLeft: {
    output: ['margin-left'],
    transformValue: transformNumeric,
  },
  marginVertical: {
    output: ['margin-top', 'margin-bottom'],
    transformValue: transformNumeric,
  },
  marginHorizontal: {
    output: ['margin-right', 'margin-left'],
    transformValue: transformNumeric,
  },

  padding: {
    output: ['padding'],
    transformValue: transformNumeric,
  },
  paddingTop: {
    output: ['padding-top'],
    transformValue: transformNumeric,
  },
  paddingRight: {
    output: ['padding-right'],
    transformValue: transformNumeric,
  },
  paddingBottom: {
    output: ['padding-bottom'],
    transformValue: transformNumeric,
  },
  paddingLeft: {
    output: ['padding-left'],
    transformValue: transformNumeric,
  },
  paddingVertical: {
    output: ['padding-top', 'padding-bottom'],
    transformValue: transformNumeric,
  },
  paddingHorizontal: {
    output: ['padding-right', 'padding-left'],
    transformValue: transformNumeric,
  },
}

export default propAliases
