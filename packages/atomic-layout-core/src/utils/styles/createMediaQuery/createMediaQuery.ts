import {
  Numeric,
  Breakpoint,
  BreakpointBehavior,
} from '../../../const/defaultOptions'
import transformNumeric from '../../math/transformNumeric'
import normalizeQuery from '../../styles/normalizeQuery'
import compose from '../../functions/compose'

type MediaQueryPair = [string, Numeric]

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
  queryList: MediaQueryPair[],
): MediaQueryPair[] => {
  return queryList.filter(([queryParam]) =>
    shouldAppendProperty(queryParam, behavior),
  )
}

/**
 * Joins a given media query params list with the given transformer function.
 */
export const joinQueryList = (transformer: (pair: MediaQueryPair) => any) => (
  queryList: MediaQueryPair[],
) => {
  return queryList.map(transformer).join(' and ')
}

export default function createMediaQuery(
  breakpoint: Breakpoint,
  behavior: BreakpointBehavior,
): string {
  return compose(
    joinQueryList(([dashedQueryProp, propValue]) => {
      return `(${dashedQueryProp}:${String(transformNumeric(propValue))})`
    }),
    filterRelevantQueryParams(behavior),
    normalizeQuery,
  )(breakpoint)
}
