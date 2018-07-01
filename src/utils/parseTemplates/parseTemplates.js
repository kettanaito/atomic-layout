// @flow
import compose from '../compose'
import pick from '../pick'
import getAreasList from '../getAreasList'
import generateComponents from '../generateComponents'

const filterTemplateProps = pick([/^template(?=[A-Z]|$)/])

const parseTemplates = compose(
  generateComponents,
  getAreasList,
  filterTemplateProps,
)

export default parseTemplates
