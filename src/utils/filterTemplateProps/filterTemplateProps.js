// @flow
import type { TProps } from '../parsePropName'
import isTemplateProp from '../isTemplateProp'
import pick from '../pick'

export default function findTemplateProps (props: TProps) {
  const templatePropKeys = Object.keys(props).filter(isTemplateProp)
  return pick(props, templatePropKeys)
}
