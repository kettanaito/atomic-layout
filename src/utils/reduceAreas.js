import getAreaOptions from './getAreaOptions'

export default function templateToAreas(templates) {
  const { length: templatesCount } = templates

  return templates.reduce((all, template, index) => {
    const isLast = index === templatesCount - 1
    return getAreaOptions(all, template, isLast)
  }, {})
}
