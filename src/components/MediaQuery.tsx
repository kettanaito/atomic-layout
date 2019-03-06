import * as React from 'react'
import { MediaQuery as MediaQueryProps } from '@const/defaultOptions'
import { normalizeQuery } from '@utils/styles/createMediaQuery'
import transformNumeric from '@utils/math/transformNumeric'

interface Props extends MediaQueryProps {
  children: (matches: boolean) => JSX.Element
  matches?: boolean
}

const createMediaQuery = (queryProps: MediaQueryProps): string => {
  return normalizeQuery(queryProps)
    .map(([propName, propValue]) => {
      /**
       * Transform values that begin with a number to prevent
       * transformations of "calc" expressions.
       * Transformation of numerics is necessary when a simple
       * number is used as a value (min-width: 750) is not valid.
       *
       * (min-width: 750) ==> (min-width: 750px)
       */
      const resolvedPropValue = /^\d/.test(propValue as string)
        ? transformNumeric(propValue)
        : propValue
      return `(${propName}:${resolvedPropValue})`
    })
    .join(' and ')
}

const MediaQuery = (props: Props): JSX.Element => {
  const { children, ...queryProps } = props
  const query = createMediaQuery(queryProps)
  const [matches, setMatches] = React.useState(
    /**
     * Match the query on the client, and use "false" on the server.
     * (?) Use some "staticMatch" with explicit values
     */
    typeof matchMedia !== 'undefined' ? matchMedia(query).matches : false,
  )

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
  }, Object.keys(queryProps))

  return children(matches)
}

export default MediaQuery
