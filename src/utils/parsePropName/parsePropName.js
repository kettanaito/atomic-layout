// @flow
import type { TBreakpointBehavior } from '../../const/defaultOptions'
import Layout                       from '../../Layout'
import toLowerCaseFirst             from '../toLowerCaseFirst/index'

export type TProps = {
  [propName: string]: mixed,
}

export type TParsedProp = {
  purePropName: string,
  breakpointName?: string,
  isDefaultBreakpoint: boolean,
  behavior: TBreakpointBehavior,
}

/**
 * Returns a parsed prop summary, which includes pure prop name,
 * an optional breakpoint name and breakpoint behavior.
 *
 * \w+(?<=(sm)?(only)?)$
 * This RegExp also works well. May consider implementing once
 * lookbehind is supported everywhere.
 */
export default function parsePropName(propName: string): TParsedProp {
  const joinedBreakpointNames = Layout.getBreakpointsNames().join('|')
  const joinedBehaviors = ['down', 'only'].join('|')
  const breakpointExp = new RegExp(`(${joinedBreakpointNames})$`, 'gi')
  const behaviorExp = new RegExp(`(${joinedBehaviors})$`, 'gi')

  const behaviorMatch = propName.match(behaviorExp)
  const behavior = behaviorMatch ? behaviorMatch[0] : ''
  const breakpointMatch = propName.replace(behavior, '').match(breakpointExp)
  const breakpointName = breakpointMatch ? breakpointMatch[0] : ''
  const purePropName = propName
    .replace(breakpointName, '')
    .replace(behavior, '')

  const resolvedBreakpointName = breakpointName
    ? toLowerCaseFirst(breakpointName)
    : Layout.defaultBreakpointName
  const isDefaultBreakpoint =
    resolvedBreakpointName === Layout.defaultBreakpointName

  return {
    purePropName,
    breakpointName: resolvedBreakpointName,
    isDefaultBreakpoint,
    behavior: behavior ? toLowerCaseFirst(behavior) : Layout.defaultBehavior,
  }
}
