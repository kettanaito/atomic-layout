import { parseResponsivePropName } from './applyStyles'

export default function getPropByName(expectedPropName, props) {
  return Object.keys(props).reduce((acc, propName) => {
    const data = parseResponsivePropName(propName)

    if (expectedPropName !== data.propName) {
      return acc
    }

    const propValue = props[propName]

    return acc.concat(Object.assign({}, data, { propValue }))
  }, [])
}
