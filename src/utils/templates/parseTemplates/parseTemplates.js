// @flow
import compose from '../../functions/compose'
import getAreasList from '../getAreasList'
import generateComponents from '../generateComponents'
import filterTemplateProps from './filterTemplateProps'

const parseTemplates = compose(
  generateComponents,
  getAreasList,
  filterTemplateProps,
)

export default parseTemplates
