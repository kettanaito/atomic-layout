import compose from '../../functions/compose'
import memoizeWith from '../../functions/memoizeWith'
import getAreasList from '../getAreasList'
import hashString from '../../strings/hashString'
import { Props } from '../../strings/parsePropName'
import generateComponents, { AreasMap } from '../generateComponents'
import filterTemplateProps, { TemplateProps } from './filterTemplateProps'

type ParseTemplates = (props: Props) => AreasMap

/**
 * Memoize areas generation based on the sanitized "templateProp:areas" pairs.
 * Alphabetical sorting of incoming template areas allows reproducible cache keys.
 * @todo `paris` is an empty array sometimes. Should we handle it somehow?
 */
const memoized = memoizeWith((templateProps: TemplateProps) => {
  const pairs = Object.entries(templateProps).reduce<string[]>(
    (acc, [propName, templateAreas]) => {
      return acc.concat(`${propName}:${templateAreas.join()}`)
    },
    [],
  )

  return hashString(pairs.join())
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
