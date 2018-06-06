// @flow
import type { TParsedProp } from './parsePropName'
import parsePropName from './parsePropName'

export type TProps = {
  [propName: string]: mixed,
}

export type TProp<T> = TParsedProp & {
  propValue: T,
}

export default function getPropByName(
  expectedPropName: string,
  props: TProps,
): TProp<mixed>[] {
  return Object.keys(props).reduce((acc, propName) => {
    const parsedProp = parsePropName(propName)

    if (expectedPropName !== parsedProp.purePropName) {
      return acc
    }

    const propValue = props[propName]

    return acc.concat(Object.assign({}, parsedProp, { propValue }))
  }, [])
}
