import { useState, useMemo, useEffect } from 'react'
import { MediaQuery as MediaQueryParams } from '@const/defaultOptions'
import { joinQueryList } from '@utils/styles/createMediaQuery'
import normalizeQuery from '@src/utils/styles/normalizeQuery'
import transformNumeric from '@utils/math/transformNumeric'
import compose from '@src/utils/functions/compose'

const createMediaQuery = (queryParams: MediaQueryParams): string => {
  return compose(
    joinQueryList(([paramName, paramValue]) => {
      /**
       * Transform values that begin with a number to prevent
       * transformations of "calc" expressions.
       * Transformation of numerics is necessary when a simple
       * number is used as a value (min-width: 750) is not valid.
       *
       * (min-width: 750) ==> (min-width: 750px)
       */
      const resolvedParamValue = /^\d/.test(String(paramValue))
        ? transformNumeric(paramValue)
        : paramValue
      return `(${paramName}:${resolvedParamValue})`
    }),
    normalizeQuery,
  )(queryParams)
}

type UseMediaQuery = (
  queryParams: MediaQueryParams,
  initialMatches?: boolean,
) => boolean

export const useMediaQuery: UseMediaQuery = (
  queryParams,
  initialMatches = false,
): boolean => {
  const [matches, setMatches] = useState(initialMatches)
  const query = useMemo(() => {
    return createMediaQuery(queryParams)
  }, [queryParams])

  const handleMediaQueryChange = (
    mediaQueryList: MediaQueryList | MediaQueryListEvent,
  ) => {
    setMatches(mediaQueryList.matches)
  }

  useEffect(() => {
    const mediaQueryList = matchMedia(query)
    handleMediaQueryChange(mediaQueryList)
    mediaQueryList.addListener(handleMediaQueryChange)

    return () => {
      mediaQueryList.removeListener(handleMediaQueryChange)
    }
  }, Object.keys(queryParams))

  return matches
}
