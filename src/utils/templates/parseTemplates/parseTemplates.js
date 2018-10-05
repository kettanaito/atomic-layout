// @flow
import compose from '../../functions/compose'
import generateAreasList from '../generateAreasList'
import generateComponents from '../generateComponents'
import filterTemplateProps from './filterTemplateProps'

const parseTemplates = compose(
  generateComponents,
  generateAreasList,
  filterTemplateProps,
)

export default parseTemplates
