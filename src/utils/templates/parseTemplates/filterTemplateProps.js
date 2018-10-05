// @flow
import parsePropName from '../../strings/parsePropName'

/**
 * Accepts a props object and filters it to include
 * only template-related prop:value pairs.
 */
const filterTemplateProps = (obj: Object) => {
  return Object.keys(obj)
    .filter((propName) => {
      /**
       * @todo Consider breaking down "parsePropName" into atomic functions,
       * and calling only the one returning prop name here. Right now it breaks
       * a prop name to include breakpoint and behavior, which are not needed
       * in this function.
       */
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
