import * as React from 'react'
import { MediaQuery as MediaQueryProps } from '../const/defaultOptions'
import { normalizeQuery } from '../utils/styles/createMediaQuery'
import transformNumeric from '../utils/math/transformNumeric'

interface Props extends MediaQueryProps {
  children: (matches: boolean) => JSX.Element
  matches?: boolean
}

const MediaQuery = (props: Props): JSX.Element => {
  const { children, matches: defaultMatches, ...queryProps } = props
  const [matches, setMatches] = React.useState(defaultMatches)

  /**
   * @todo Make this query composition adequate.
   */
  const query = normalizeQuery(queryProps)
    .map(([propName, propValue]) => {
      /**
       * Transform values that begin with a number to prevent
       * transformations of "calc" expressions.
       * Transformation of numerics is necessary when a simple
       * number is used as a value (min-width: 750) is not valid.
       */
      const resolvedPropValue = /^\d/.test(propValue as string)
        ? transformNumeric(propValue)
        : propValue
      return `(${propName}:${resolvedPropValue})`
    })
    .join(' and ')

  const handleChange = (
    mediaQueryList: MediaQueryList | MediaQueryListEvent,
  ) => {
    setMatches(mediaQueryList.matches)
  }

  React.useEffect(() => {
    const mediaQueryList = matchMedia(query)
    handleChange(mediaQueryList)
    mediaQueryList.addListener(handleChange)

    return () => mediaQueryList.removeListener(handleChange)
  }, Object.keys(queryProps))

  return children(matches)
}

MediaQuery.defaultProps = {
  matches: false,
}

export default MediaQuery
