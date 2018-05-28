/**
 * Default resolutions based on Bootstrap grid.
 */
const resolutions = [
  {
    name: 'xs',
    to: 575,
  },
  {
    name: 'sm',
    from: 576,
    to: 768,
  },
  {
    name: 'md',
    from: 769,
    to: 992,
  },
  {
    name: 'lg',
    from: 993,
    to: 1199,
  },
  {
    name: 'xl',
    from: 1200,
  },
]

export const getResolutionNames = () =>
  resolutions.map((resolution) => resolution.name)

export const getResolutionFor = (mediaQuery) => {
  return resolutions.find((resolution) => resolution.name === mediaQuery)
}

export default resolutions
