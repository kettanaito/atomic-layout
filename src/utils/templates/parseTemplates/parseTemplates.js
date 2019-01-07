// @flow
import compose from '../../functions/compose'
import memoizeWith from '../../functions/memoizeWith'
import getAreasList from '../getAreasList'
import generateComponents from '../generateComponents'
import filterTemplateProps from './filterTemplateProps'

/**
 * Memoize components generation based on the sanitized template props.
 * Alphabetical sorting of template areas allows reproducible cache keys.
 */
const memoize = memoizeWith((templateProps) => {
  return btoa(
    Object.entries(templateProps)
      .reduce((acc, [templateName, templateAreas]) => {
        return acc.concat(`${templateName}:${templateAreas.join()}`)
      }, [])
      .join(),
  )
})

const parseTemplates = compose(
  memoize(
    compose(
      generateComponents,
      getAreasList,
    ),
  ),
  filterTemplateProps,
)

export default parseTemplates
