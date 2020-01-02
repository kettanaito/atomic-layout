import { useState, useEffect } from 'react'
import {
  Numeric,
  Layout,
  createMediaQuery,
  ParsedProp,
  parsePropName,
} from '@atomic-layout/core'
import useBreakpointChange from './useBreakpointChange'

type MatcherFunction = (parsedProp: ParsedProp) => boolean

/**
 * Default responsive props matcher.
 * Creates a media query based on the given prop's breakpoint
 * and uses native "window.matchMedia" to assert the match.
 */
const defaultMatcher: MatcherFunction = (parsedProp) => {
  const { breakpoint, behavior } = parsedProp
  const mediaQuery = createMediaQuery(
    Layout.breakpoints[breakpoint.name],
    behavior,
  )

  return matchMedia(mediaQuery).matches
}

/**
 * Server-side responsive props matcher.
 * Apply props with the default breakpoint on the server.
 * Server assumes the default breakpoint is currently present.
 *
 * @TODO Resolve for non-default breakpoints.
 * @see https://github.com/kettanaito/atomic-layout/issues/284
 */
const serverMatcher: MatcherFunction = (parsedProp) => {
  const { breakpoint } = parsedProp
  return breakpoint.isDefault && typeof window === 'undefined'
}

/**
 * Filters given responsive props against the browser state.
 * Accepts an optional matcher function to operate on a server.
 */
const filterProps = <R>(
  props: Record<string, any>,
  matcher: MatcherFunction = defaultMatcher,
) => {
  return Object.keys(props)
    .map(parsePropName)
    .filter(matcher)
    .reduce<R>(
      (acc, { originPropName, purePropName }) => ({
        ...acc,
        [purePropName]: props[originPropName],
      }),
      {} as R,
    )
}

/**
 * Accepts an object of responsive props and returns
 * an object of props relative to the current viewport.
 */
const useResponsiveProps = <ResponsiveProps extends Record<string, Numeric>>(
  responsiveProps: ResponsiveProps,
): Partial<ResponsiveProps> => {
  const [props, setProps] = useState<ResponsiveProps>(
    filterProps(responsiveProps, serverMatcher),
  )
  const [breakpointName, setBreakpointName] = useState<string>()

  const resolveProps = (inputProps: ResponsiveProps) => {
    return filterProps<ResponsiveProps>(inputProps)
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
