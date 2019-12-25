import { useState, useEffect } from 'react'
import {
  Numeric,
  Layout,
  createMediaQuery,
  parsePropName,
} from '@atomic-layout/core'
import useBreakpointChange from './useBreakpointChange'

/**
 * Accepts an object of responsive props and returns
 * an object of props relative to the current viewport.
 */
const useResponsiveProps = <ResponsiveProps extends Record<string, Numeric>>(
  responsiveProps: ResponsiveProps,
): Partial<ResponsiveProps> => {
  const [props, setProps] = useState<ResponsiveProps>()
  const [breakpointName, setBreakpointName] = useState<string>()

  const resolveProps = (inputProps: ResponsiveProps) => {
    const nextProps = Object.keys(inputProps)
      .map(parsePropName)
      .filter(({ breakpoint, behavior }) => {
        const mediaQuery = createMediaQuery(
          Layout.breakpoints[breakpoint.name],
          behavior,
        )
        const { matches } = matchMedia(mediaQuery)

        return matches
      })
      .reduce<ResponsiveProps>(
        (acc, { originPropName, purePropName }) => ({
          ...acc,
          [purePropName]: inputProps[originPropName],
        }),
        {} as ResponsiveProps,
      )

    return nextProps
  }

  // Store the current breakpoint name in the state.
  // That way props update effect below can re-evaluate whenever
  // a breakpoint changes.
  // When the next prop resolver is given directly to "useBreakpointChange"
  // it always resolves the input "responsiveProps" to their initial value.
  // Using `useCallback()` hook doesn't help.
  useBreakpointChange(setBreakpointName)

  // Update props whenever input props change.
  // Required to trigger re-render on props change.
  useEffect(() => {
    const nextProps = resolveProps(responsiveProps)
    setProps(nextProps)
  }, [responsiveProps, breakpointName])

  return props || {}
}

export default useResponsiveProps
