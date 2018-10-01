// @flow
import * as R from 'ramda'
import getAreasList from '../getAreasList'
import generateComponents from '../generateComponents'
import filterTemplateProps from './filterTemplateProps'

const parseTemplates = R.compose(
  generateComponents,
  getAreasList,
  filterTemplateProps,
)

export default parseTemplates
