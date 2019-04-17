import { Numeric } from '@const/defaultOptions'
import compose from '@utils/functions/compose'
import sanitizeTemplateArea from '@utils/strings/sanitizeTemplateArea'

export type ValueTransformer<Input, Return> = (
  value: Input,
  Layout: any,
) => Return

interface PropAlias {
  output: string[]
  transformValue?: ValueTransformer<Numeric, string>
}

export interface PropAliases {
  [aliasName: string]: PropAlias
}

const deferredTransformNumeric: ValueTransformer<Numeric, string> = (
  value,
  Layout,
) => {
  return Layout.transformNumeric(value)
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
    transformValue: deferredTransformNumeric,
  },
  gapCol: {
    output: ['grid-column-gap'],
    transformValue: deferredTransformNumeric,
  },
  gapRow: {
    output: ['grid-row-gap'],
    transformValue: deferredTransformNumeric,
  },
  gutter: {
    output: ['grid-gap'],
    transformValue: deferredTransformNumeric,
  },
  gutterCol: {
    output: ['grid-column-gap'],
    transformValue: deferredTransformNumeric,
  },
  gutterRow: {
    output: ['grid-row-gap'],
    transformValue: deferredTransformNumeric,
  },
  autoRows: {
    output: ['grid-auto-rows'],
    transformValue: deferredTransformNumeric,
  },
  autoCols: {
    output: ['grid-auto-columns'],
    transformValue: deferredTransformNumeric,
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
    transformValue: deferredTransformNumeric,
  },
  minHeight: {
    output: ['min-height'],
    transformValue: deferredTransformNumeric,
  },
  maxHeight: {
    output: ['max-height'],
    transformValue: deferredTransformNumeric,
  },
  width: {
    output: ['width'],
    transformValue: deferredTransformNumeric,
  },
  minWidth: {
    output: ['min-width'],
    transformValue: deferredTransformNumeric,
  },
  maxWidth: {
    output: ['max-width'],
    transformValue: deferredTransformNumeric,
  },

  /* Spacing */
  margin: {
    output: ['margin'],
    transformValue: deferredTransformNumeric,
  },
  marginTop: {
    output: ['margin-top'],
    transformValue: deferredTransformNumeric,
  },
  marginRight: {
    output: ['margin-right'],
    transformValue: deferredTransformNumeric,
  },
  marginBottom: {
    output: ['margin-bottom'],
    transformValue: deferredTransformNumeric,
  },
  marginLeft: {
    output: ['margin-left'],
    transformValue: deferredTransformNumeric,
  },
  marginVertical: {
    output: ['margin-top', 'margin-bottom'],
    transformValue: deferredTransformNumeric,
  },
  marginHorizontal: {
    output: ['margin-right', 'margin-left'],
    transformValue: deferredTransformNumeric,
  },

  padding: {
    output: ['padding'],
    transformValue: deferredTransformNumeric,
  },
  paddingTop: {
    output: ['padding-top'],
    transformValue: deferredTransformNumeric,
  },
  paddingRight: {
    output: ['padding-right'],
    transformValue: deferredTransformNumeric,
  },
  paddingBottom: {
    output: ['padding-bottom'],
    transformValue: deferredTransformNumeric,
  },
  paddingLeft: {
    output: ['padding-left'],
    transformValue: deferredTransformNumeric,
  },
  paddingVertical: {
    output: ['padding-top', 'padding-bottom'],
    transformValue: deferredTransformNumeric,
  },
  paddingHorizontal: {
    output: ['padding-right', 'padding-left'],
    transformValue: deferredTransformNumeric,
  },
}

export default propAliases
