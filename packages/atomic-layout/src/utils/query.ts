import { memoizeWith } from '@atomic-layout/core'
import { createMediaQuery } from '../hooks/useMediaQuery'
import { ResponsiveQueryParams } from '../hooks/useResponsiveQuery'
import { getBreakpointsByQuery } from './getBreakpointsByQuery'

const createQuery = (params: ResponsiveQueryParams): string => {
  const breakpoints = getBreakpointsByQuery(params)
  return breakpoints.map(createMediaQuery).join(params.except ? ',' : ' ')
}

/**
 * Converts a responsive query into a @media query string.
 * @example
 * query({ from: 'md' })
 * // (min-width: 768px)
 * query({ from: 'sm', to: 'lg' })
 * // (min-width: 576px) and (max-width: 1199px)
 * query({ for: 'md' })
 * // (min-width: 768px) and (max-width: 991px)
 * query({ except: true, from: 'sm', to: 'lg' })
 * // (max-width: 575px), (min-width: 992px)
 */
export const query = memoizeWith<typeof createQuery>((params) => {
  return Object.entries(params)
    .filter(([, value]) => value != null)
    .reduce((acc, [key, value]) => {
      return acc.concat(`${key}=${value.toString()}`)
    }, [])
    .join()
})(createQuery)
