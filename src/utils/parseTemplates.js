// @flow
import type { TBehavior } from '../const/breakpoints'
import type { TParsedProp } from './getPropByName'
import type { TAreaComponentsMap } from './generateComponents'
import compose from './compose'
import sanitizeTemplates from './sanitizeTemplates'
import generateComponents from './generateComponents'
import reduceAreas from './reduceAreas'

export type TGridTemplate = {
  behavior: TBehavior,
  breakpointName: ?string,
  areas: string[],
}

type TParseTemplates = (templates: TParsedProp<string>[]) => TAreaComponentsMap

const parseTemplates: TParseTemplates = compose(
  generateComponents,
  reduceAreas,
  sanitizeTemplates,
)

export default parseTemplates
