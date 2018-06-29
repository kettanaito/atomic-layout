// @flow
import compose from '../compose'
import pick from '../pick'
import getAreasList from '../getAreasList'
import getComponents from '../getComponents'

const filterTemplateProps = pick([/^template/])

const parseTemplates = compose(
  getComponents,
  getAreasList,
  filterTemplateProps,
)

export default parseTemplates
