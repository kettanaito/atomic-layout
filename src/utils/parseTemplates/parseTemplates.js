// @flow
import compose from '../compose'
import getAreasList from '../getAreasList'
import getComponents from '../getComponents'
import findTemplateProps from '../filterTemplateProps'

const parseTemplates = compose(
  getComponents,
  getAreasList,
  findTemplateProps,
)

export default parseTemplates
