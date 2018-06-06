// @flow
import type { TBreakpointBehavior } from '../const/defaultOptions'
import Layout from '../Layout'

export type TParsedProp = {
  purePropName: string,
  breakpointName?: string,
  behavior: TBreakpointBehavior,
}

const createResult = (purePropName, breakpointName, behavior): TParsedProp => ({
  purePropName,
  breakpointName: breakpointName && breakpointName.toLowerCase(),
  behavior: behavior ? behavior.toLowerCase() : 'up',
})

export default function parsePropName(propName: string): TParsedProp {
  const joinedBreakpointNames = Layout.getBreakpointsNames().join('|')
  const joinedBehaviors = ['down', 'only'].join('|')
  const regex = new RegExp(
    `(\\w+)(${joinedBreakpointNames})(${joinedBehaviors})*$`,
    'i',
  )

  const parsed = regex.exec(propName)

  if (!parsed) {
    return createResult(propName)
  }

  const [_, purePropName, breakpointName, behavior] = parsed
  return createResult(purePropName, breakpointName, behavior)
}
