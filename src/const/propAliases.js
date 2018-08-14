// @flow
import compose from '../utils/functions/compose'
import transformNumeric from '../utils/math/transformNumeric'
import sanitizeTemplateArea from '../utils/strings/sanitizeTemplateArea'

type TValueTransformer<T> = (val: any) => T

type TPropAliasOptions = {
  props: string[],
  transformValue?: TValueTransformer<?string>,
}

type TPropAliases = {
  [propAlias: string]: TPropAliasOptions,
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
const propAliases: TPropAliases = {
  /* CSS Grid */
  template: {
    props: ['grid-template-areas'],
    transformValue: transformTemplateString,
  },
  templateCols: {
    props: ['grid-template-columns'],
  },
  templateRows: {
    props: ['grid-template-rows'],
  },
  col: {
    props: ['grid-column'],
  },
  colStart: {
    props: ['grid-column-start'],
  },
  colEnd: {
    props: ['grid-column-end'],
  },
  row: {
    props: ['grid-row'],
  },
  rowStart: {
    props: ['grid-row-start'],
  },
  rowEnd: {
    props: ['grid-row-end'],
  },
  gutter: {
    props: ['grid-gap'],
    transformValue: transformNumeric,
  },
  gutterCol: {
    props: ['grid-column-gap'],
    transformValue: transformNumeric,
  },
  gutterRow: {
    props: ['grid-row-gap'],
    transformValue: transformNumeric,
  },
  align: {
    props: ['align-self'],
  },
  alignItems: {
    props: ['align-items'],
  },
  justify: {
    props: ['justify-self'],
  },
  justifyItems: {
    props: ['justify-items'],
  },
  justifyContent: {
    props: ['justify-content'],
  },
  place: {
    props: ['place-self'],
  },
  placeItems: {
    props: ['place-items'],
  },
  placeContent: {
    props: ['place-content'],
  },

  /* Dimensions */
  height: {
    props: ['height'],
    transformValue: transformNumeric,
  },
  width: {
    props: ['width'],
    transformValue: transformNumeric,
  },

  /* Space */
  margin: {
    props: ['margin'],
    transformValue: transformNumeric,
  },
  marginTop: {
    props: ['margin-top'],
    transformValue: transformNumeric,
  },
  marginRight: {
    props: ['margin-right'],
    transformValue: transformNumeric,
  },
  marginBottom: {
    props: ['margin-bottom'],
    transformValue: transformNumeric,
  },
  marginLeft: {
    props: ['margin-left'],
    transformValue: transformNumeric,
  },
  marginVertical: {
    props: ['margin-top', 'margin-bottom'],
    transformValue: transformNumeric,
  },
  marginHorizontal: {
    props: ['margin-right', 'margin-left'],
    transformValue: transformNumeric,
  },

  padding: {
    props: ['padding'],
    transformValue: transformNumeric,
  },
  paddingTop: {
    props: ['padding-top'],
    transformValue: transformNumeric,
  },
  paddingRight: {
    props: ['padding-right'],
    transformValue: transformNumeric,
  },
  paddingBottom: {
    props: ['padding-bottom'],
    transformValue: transformNumeric,
  },
  paddingLeft: {
    props: ['padding-left'],
    transformValue: transformNumeric,
  },
  paddingVertical: {
    props: ['padding-top', 'padding-bottom'],
    transformValue: transformNumeric,
  },
  paddingHorizontal: {
    props: ['padding-right', 'padding-left'],
    transformValue: transformNumeric,
  },
}

export default propAliases
