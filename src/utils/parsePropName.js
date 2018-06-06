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
  const parsedPurePropName: string = parsed[1]
  const breakpointName: string = parsed[2]
  const behavior: TBreakpointBehavior = parsed[3] && parsed[3].toLowerCase()

  return {
    purePropName: parsedPurePropName || propName,
    breakpointName: breakpointName && breakpointName.toLowerCase(),
    behavior: behavior || 'up',
  }
}
