// @flow
import type { TParsedResponsiveProp } from './applyStyles'
import { parseResponsivePropName } from './applyStyles'

export type TProps = {
  [propName: string]: mixed,
}

export type TParsedProp<T> = TParsedResponsiveProp & {
  propValue: T,
}

export default function getPropByName(
  expectedPropName: string,
  props: TProps,
): TParsedProp<mixed>[] {
  return Object.keys(props).reduce((acc, propName) => {
    const data = parseResponsivePropName(propName)

    if (expectedPropName !== data.propName) {
      return acc
    }

    const propValue = props[propName]

    return acc.concat(Object.assign({}, data, { propValue }))
  }, [])
}
