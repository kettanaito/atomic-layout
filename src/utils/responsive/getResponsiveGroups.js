/**
 * Returns responsive groups based on the component presence
 * in the existing resolutions.
 */
export default function getResponsiveGroups(component, resolutions) {
  return resolutions.reduce((allGroups, resolution) => {
    const { name, from, to } = resolution
    const lastGroup = allGroups[allGroups.length - 1] || {}
    const hasComponent = component.resolutions.includes(name)

    if (hasComponent) {
      const hasSiblingResolution = from === lastGroup.to + 1

      if (hasSiblingResolution) {
        lastGroup.to = to
        allGroups[allGroups.length - 1] = Object.assign({}, lastGroup, { to })
        return allGroups
      }

      const newGroup = { from, to }
      return allGroups.concat(newGroup)
    }

    return allGroups
  }, [])
}
