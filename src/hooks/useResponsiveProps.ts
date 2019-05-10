import { useState } from 'react'
import Layout from '@src/Layout'
import useBreakpointChange from './useBreakpointChange'
import parsePropName from '@utils/strings/parsePropName'
import createMediaQuery from '@utils/styles/createMediaQuery'

/**
 * Accepts an object of responsive props and returns
 * an object of props relative to the current viewport.
 */
const useResponsiveProps = <ResponsiveProps = {}>(
  responsiveProps: ResponsiveProps,
) => {
  const [props, setProps] = useState({})

  useBreakpointChange(() => {
    const relevantProps = Object.keys(responsiveProps)
      .map(parsePropName)
      .filter(({ breakpoint, behavior }) => {
        const mediaQuery = createMediaQuery(
          Layout.breakpoints[breakpoint.name],
          behavior,
        )
        return matchMedia(mediaQuery).matches
      })
      .reduce(
        (acc, { originPropName, purePropName }) => ({
          ...acc,
          [purePropName]: responsiveProps[originPropName],
        }),
        {},
      )

    setProps(relevantProps)
  })

  return props
}

export default useResponsiveProps
