import filterTemplateProps, { TemplateProps } from './filterTemplateProps'
import getAreasList, { AreasList } from '../getAreasList'
import compose from '../../functions/compose'
import memoizeWith from '../../functions/memoizeWith'
import hashString from '../../strings/hashString'
import { Props } from '../../strings/parsePropName'

type ParseTemplates = (props: Props) => AreasList

/**
 * Memoize areas generation based on the sanitized "templateProp:areas" pairs.
 * Alphabetical sorting of incoming template areas allows reproducible cache keys.
 * @todo `pairs` is an empty array sometimes. Should we handle it somehow?
 */
const memoizeProps = memoizeWith((templateProps: TemplateProps) => {
  const pairs = Object.entries(templateProps).reduce<string[]>(
    (acc, [propName, templateAreas]) => {
      return acc.concat(`${propName}:${templateAreas.join()}`)
    },
    [],
  )

  return hashString(pairs.join()).toString()
})

/**
 * Parses a given map of props and returns an areas map.
 */
const parseTemplates: ParseTemplates = compose(
  memoizeProps(getAreasList),
  filterTemplateProps,
)

export default parseTemplates
