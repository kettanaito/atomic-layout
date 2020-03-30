import * as React from 'react'
import { MediaQuery as MediaQueryParams } from '@atomic-layout/core'
import { useMediaQuery } from '../hooks/useMediaQuery'

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

MediaQuery.displayName = 'MediaQuery'
MediaQuery.defaultProps = {
  matches: false,
}

export default MediaQuery
