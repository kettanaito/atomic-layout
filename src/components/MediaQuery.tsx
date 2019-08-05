import * as React from 'react'
import Layout from '@src/Layout'
import { MediaQuery as MediaQueryParams } from '@const/defaultOptions'
import { joinQueryList } from '@utils/styles/createMediaQuery'
import normalizeQuery from '@src/utils/styles/normalizeQuery'
// import transformNumeric from '@utils/math/transformNumeric'
import compose from '@src/utils/functions/compose'

interface Props extends MediaQueryParams {
  children: (matches: boolean) => JSX.Element
  matches?: boolean
}

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
        ? Layout.transformNumeric(paramValue)
        : paramValue
      return `(${paramName}:${resolvedParamValue})`
    }),
    normalizeQuery,
  )(queryParams)
}

const MediaQuery = (props: Props): JSX.Element => {
  const { children, ...queryParams } = props
  const query = React.useMemo(() => createMediaQuery(queryParams), [
    queryParams,
  ])
  const [matches, setMatches] = React.useState(false)

  const handleMediaQueryChange = (
    mediaQueryList: MediaQueryList | MediaQueryListEvent,
  ) => {
    setMatches(mediaQueryList.matches)
  }

  React.useEffect(() => {
    const mediaQueryList = matchMedia(query)
    handleMediaQueryChange(mediaQueryList)
    mediaQueryList.addListener(handleMediaQueryChange)

    return () => mediaQueryList.removeListener(handleMediaQueryChange)
  }, Object.keys(queryParams))

  return children(matches)
}

export default MediaQuery
