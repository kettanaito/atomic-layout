import * as React from 'react'
import { MediaQuery as MediaQueryParams } from '@const/defaultOptions'
import { useMediaQuery } from '@src/hooks/useMediaQuery'

interface MediaQueryProps extends MediaQueryParams {
  children: (matches: boolean) => JSX.Element
  matches?: boolean
}

const MediaQuery: React.FC<MediaQueryProps> = ({
  children,
  matches: initialMatches,
  ...queryParams
}) => {
  const matches = useMediaQuery(queryParams, initialMatches)

  return children(matches)
}

MediaQuery.defaultProps = {
  matches: false,
}

export default MediaQuery
