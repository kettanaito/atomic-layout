// @flow
import parsePropName from '../../strings/parsePropName'

/**
 * Filters the given object to contain only templates
 * declarations (props matching the RegExp).
 */
const filterTemplateProps = (obj: Object) => {
  return Object.keys(obj)
    .filter((propName) => {
      const { purePropName } = parsePropName(propName)
      return purePropName === 'template'
    })
    .reduce(
      (acc, propName) => ({
        ...acc,
        [propName]: obj[propName],
      }),
      {},
    )
}

export default filterTemplateProps
