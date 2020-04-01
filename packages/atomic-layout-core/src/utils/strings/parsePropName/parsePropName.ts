import { BreakpointBehavior } from '../../../const/defaultOptions'
import Layout from '../../../Layout'
import toLowerCaseFirst from '../toLowerCaseFirst'
import capitalize from '../capitalize'

export interface Props {
  [propName: string]: any
}

export interface ParsedProp {
  originPropName: string
  purePropName: string
  breakpoint: ParsedBreakpoint
  behavior: BreakpointBehavior
}

export interface ParsedBreakpoint {
  name: string
  isDefault: boolean
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
  const joinedBreakpointNames = Object.keys(Layout.breakpoints)
    .map(capitalize)
    .join('|')
  const joinedBehaviors = ['down', 'only'].map(capitalize).join('|')
  const breakpointExp = new RegExp(`(${joinedBreakpointNames})$`, 'g')
  const behaviorExp = new RegExp(`(${joinedBehaviors})$`, 'g')

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
    : Layout.defaultBreakpointName

  const isDefaultBreakpoint =
    normalizedBreakpointName === Layout.defaultBreakpointName

  return {
    originPropName,
    purePropName,
    behavior: behavior
      ? toLowerCaseFirst<BreakpointBehavior>(behavior)
      : Layout.defaultBehavior,
    breakpoint: {
      name: normalizedBreakpointName,
      isDefault: isDefaultBreakpoint,
    },
  }
}
