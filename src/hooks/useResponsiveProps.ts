import { useState } from 'react'
import Layout from '@src/Layout'
import useBreakpointChange from './useBreakpointChange'
import parsePropName from '@utils/strings/parsePropName'
import createMediaQuery from '@utils/styles/createMediaQuery'
import { Numeric } from '@src/const/defaultOptions'

/**
 * Accepts an object of responsive props and returns
 * an object of props relative to the current viewport.
 */
const useResponsiveProps = <ResponsiveProps extends Record<string, Numeric>>(
  responsiveProps: ResponsiveProps,
): Partial<ResponsiveProps> => {
  const [props, setProps] = useState<ResponsiveProps>()

  useBreakpointChange(() => {
    const nextProps = Object.keys(responsiveProps)
      .map(parsePropName)
      .filter(({ breakpoint, behavior }) => {
        const mediaQuery = createMediaQuery(
          Layout.breakpoints[breakpoint.name],
          behavior,
        )
        return matchMedia(mediaQuery).matches
      })
      .reduce<ResponsiveProps>(
        (acc, { originPropName, purePropName }) => ({
          ...acc,
          [purePropName]: responsiveProps[originPropName],
        }),
        {} as ResponsiveProps,
      )

    setProps(nextProps)
  })

  return props || {}
}

export default useResponsiveProps
