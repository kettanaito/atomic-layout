import compose from '../../functions/compose'
import memoizeWith from '../../functions/memoizeWith'
import getAreasList from '../getAreasList'
import { Props } from '../../strings/parsePropName'
import generateComponents, { AreasMap } from '../generateComponents'
import filterTemplateProps, { TemplateProps } from './filterTemplateProps'

type ParseTemplates = (props: Props) => AreasMap

/**
 * Memoize components generation based on the sanitized "templateProp:areas" pairs.
 * Alphabetical sorting of template areas allows reproducible cache keys.
 */
const memoized = memoizeWith((templateProps: TemplateProps) => {
  const pairs = Object.entries(templateProps).reduce<string[]>(
    (acc, [templateName, templateAreas]) => {
      return acc.concat(`${templateName}:${templateAreas.join()}`)
    },
    [],
  )

  return btoa(pairs.join())
})

const parseTemplates: ParseTemplates = compose(
  memoized(
    compose(
      generateComponents,
      getAreasList,
    ),
  ),
  filterTemplateProps,
)

export default parseTemplates
