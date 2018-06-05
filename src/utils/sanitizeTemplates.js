// @flow
import type { TParsedProp } from './getPropByName'
import type { TGridTemplate } from './parseTemplates'
import sanitizeTemplateString from './sanitizeTemplateString'

export default function sanitizeTemplates(
  templates: TParsedProp<string>[],
): TGridTemplate[] {
  return templates.map((params) =>
    Object.assign({}, params, {
      areas: sanitizeTemplateString(params.propValue),
    }),
  )
}
