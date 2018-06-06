// @flow
import type { TBreakpointBehavior } from '../const/defaultOptions'
import Layout from '../Layout'

export type TParsedProp = {
  purePropName: string,
  breakpointName?: string,
  behavior: TBreakpointBehavior,
}

/**
 * Returns a parsed prop summary, which includes pure prop name,
 * an optional breakpoint name and breakpoint behavior.
 */
export default function parsePropName(propName: string): TParsedProp {
  const joinedBreakpointNames = Layout.getBreakpointsNames().join('|')
  const joinedBehaviors = ['down', 'only'].join('|')
  const regex = new RegExp(
    `(\\w+)(${joinedBreakpointNames})(${joinedBehaviors})*$`,
    'i',
  )

  const parsed = regex.exec(propName) || []
  const parsedPurePropName = parsed[1]
  const breakpointName = parsed[2]
  const behavior = parsed[3]

  return {
    purePropName: parsedPurePropName || propName,
    breakpointName: breakpointName && breakpointName.toLowerCase(),
    behavior: behavior ? behavior.toLowerCase() : 'up',
  }
}
