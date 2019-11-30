import parsePropName, { Props } from '../../strings/parsePropName'
import sanitizeTemplateString from '../../strings/sanitizeTemplateString'

export interface TemplateProps {
  [templateProp: string]: string[]
}

/**
 * Accepts a props object and filters it to include
 * only template-related prop:value pairs.
 */
const filterTemplateProps = (props: Props): TemplateProps => {
  return Object.keys(props)
    .filter((propName) => {
      const { purePropName } = parsePropName(propName)
      return ['areas', 'template'].includes(purePropName)
    })
    .reduce<TemplateProps>((acc, propName) => {
      return {
        ...acc,
        [propName]: sanitizeTemplateString(props[propName]),
      }
    }, {})
}

export default filterTemplateProps
