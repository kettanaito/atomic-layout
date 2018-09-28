// @flow
import * as R from 'ramda'
import parsePropName from '../../strings/parsePropName'

/**
 * Returns the derived props that contain only template
 * declarations.
 */
const filterTemplateProps = R.pickBy(
  R.compose(
    R.propEq('purePropName', 'template'),
    parsePropName,
    R.nthArg(1),
  ),
)

/**
 * Filters the given object to contain only templates
 * declarations (props matching the RegExp).
 */
// const filterTemplateProps = (obj: Object) => {
//   return Object.keys(obj)
//     .filter((propName) => {
//       const { purePropName } = parsePropName(propName)
//       return purePropName === 'template'
//     })
//     .reduce(
//       (acc, propName) => ({
//         ...acc,
//         [propName]: obj[propName],
//       }),
//       {},
//     )
// }

export default filterTemplateProps
