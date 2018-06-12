// @flow
import compose from './compose'
import getAreasList from './getAreasList'
import getComponents from './getComponents'

const parseTemplates = compose(
  getComponents,
  getAreasList,
)

export default parseTemplates
