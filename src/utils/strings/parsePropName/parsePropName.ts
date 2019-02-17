import { BreakpointBehavior } from '@const/defaultOptions'
import Layout from '@src/Layout'
import toLowerCaseFirst from '../toLowerCaseFirst'

export interface Props {
  [propName: string]: any
}

export interface ParsedProp {
  originPropName: string
  purePropName: string
  breakpoint: {
    name: string
    isDefault: boolean
  }
  behavior: BreakpointBehavior
}

/**
 * Returns a parsed prop summary, which includes pure prop name,
 * an optional breakpoint name and breakpoint behavior.
 *
 * \w+(?<=(sm)?(only)?)$
 * This RegExp also works well. May consider implementing once
 * lookbehind is supported everywhere.
 */
export default function parsePropName(originPropName: string): ParsedProp {
  const joinedBreakpointNames = Layout.getBreakpointNames().join('|')
  const joinedBehaviors = ['down', 'only'].join('|')
  const breakpointExp = new RegExp(`(${joinedBreakpointNames})$`, 'gi')
  const behaviorExp = new RegExp(`(${joinedBehaviors})$`, 'gi')

  const behaviorMatch = originPropName.match(behaviorExp)
  const behavior = behaviorMatch ? behaviorMatch[0] : ''
  const breakpointMatch = originPropName
    .replace(behavior, '')
    .match(breakpointExp)
  const breakpointName = breakpointMatch ? breakpointMatch[0] : ''
  const purePropName = originPropName
    .replace(breakpointName, '')
    .replace(behavior, '')

  /**
   * Get normalized breakpoint name.
   * When a breakpoint name is a part of the prop name, covert it first letter
   * to lowercase to match the layout options. Otherwise, take the default
   * breakpoint name.
   */
  const normalizedBreakpointName = breakpointName
    ? toLowerCaseFirst(breakpointName)
    : Layout.options.defaultBreakpointName

  const isDefaultBreakpoint =
    normalizedBreakpointName === Layout.options.defaultBreakpointName

  return {
    originPropName,
    purePropName,
    behavior: behavior
      ? toLowerCaseFirst<BreakpointBehavior>(behavior)
      : Layout.options.defaultBehavior,
    breakpoint: {
      name: normalizedBreakpointName,
      isDefault: isDefaultBreakpoint,
    },
  }
}
