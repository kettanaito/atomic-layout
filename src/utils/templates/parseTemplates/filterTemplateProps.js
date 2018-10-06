// @flow
import parsePropName from '../../strings/parsePropName'

/**
 * Accepts a props object and filters it to include
 * only template-related prop:value pairs.
 */
const filterTemplateProps = (props: Object) => {
  return Object.keys(props)
    .filter((propName) => {
      const { purePropName } = parsePropName(propName)
      return purePropName === 'template'
    })
    .reduce((acc, propName) => {
      return {
        ...acc,
        [propName]: props[propName],
      }
    }, {})
}

export default filterTemplateProps
