import Layout from '@src/Layout'
import { Numeric, Breakpoint, BreakpointBehavior } from '@const/defaultOptions'
import normalizeQuery from '@src/utils/styles/normalizeQuery'
import compose from '@src/utils/functions/compose'

/**
 * Determines whether a given media query param should be added
 * to the media query string based on a breakpoint's behavior.
 */
const shouldAppendProperty = (
  queryParam: string,
  behavior: BreakpointBehavior,
): boolean => {
  const [prefix, splitPropName] = queryParam.split('-')
  const isDimensionalProp = ['height', 'width'].includes(splitPropName)

  if (!isDimensionalProp) {
    return true
  }

  return (
    (prefix === 'min' && ['up', 'only'].includes(behavior)) ||
    (prefix === 'max' && ['down', 'only'].includes(behavior))
  )
}

const filterRelevantQueryParams = (behavior: BreakpointBehavior) => (
  queryList,
): boolean => {
  return queryList.filter(([queryParam]) =>
    shouldAppendProperty(queryParam, behavior),
  )
}

/**
 * Joins a given query params list with the given transformer function.
 */
export const joinQueryList = (
  transformer: (pair: [string, Numeric]) => any,
) => (queryList) => {
  return queryList.map(transformer).join(' and ')
}

export default function createMediaQuery(
  breakpoint: Breakpoint,
  behavior: BreakpointBehavior,
): string {
  return compose(
    joinQueryList(([dashedQueryProp, propValue]) => {
      return `(${dashedQueryProp}:${String(
        Layout.transformNumeric(propValue),
      )})`
    }),
    filterRelevantQueryParams(behavior),
    normalizeQuery,
  )(breakpoint)
}
