import toRem from '../utils/toRem'

export default {
  /* Grid */
  template: {
    props: ['grid-template-areas'],
    transformValue: (val) => val.trim(),
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
    transformValue: toRem,
  },
  gutterCol: {
    props: ['grid-column-gap'],
    transformValue: toRem,
  },
  gutterRow: {
    props: ['grid-row-gap'],
    transformValue: toRem,
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
    transformValue: toRem,
  },
  width: {
    props: ['width'],
    transformValue: toRem,
  },

  /* Space */
  margin: {
    props: ['margin'],
    transformValue: toRem,
  },
  marginTop: {
    props: ['margin-top'],
    transformValue: toRem,
  },
  marginRight: {
    props: ['margin-right'],
    transformValue: toRem,
  },
  marginBottom: {
    props: ['margin-bottom'],
    transformValue: toRem,
  },
  marginLeft: {
    props: ['margin-left'],
    transformValue: toRem,
  },
  marginVertical: {
    props: ['margin-top', 'margin-bottom'],
    transformValue: toRem,
  },
  marginHorizontal: {
    props: ['margin-right', 'margin-left'],
    transformValue: toRem,
  },

  padding: {
    props: ['padding'],
    transformValue: toRem,
  },
  paddingTop: {
    props: ['padding-top'],
    transformValue: toRem,
  },
  paddingRight: {
    props: ['padding-right'],
    transformValue: toRem,
  },
  paddingBottom: {
    props: ['padding-bottom'],
    transformValue: toRem,
  },
  paddingLeft: {
    props: ['padding-left'],
    transformValue: toRem,
  },
  paddingVertical: {
    props: ['padding-top', 'padding-bottom'],
    transformValue: toRem,
  },
  paddingHorizontal: {
    props: ['padding-right', 'padding-left'],
    transformValue: toRem,
  },
}
