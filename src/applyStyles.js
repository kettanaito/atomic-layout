import propAliases from './const/propAliases'
import mediaQueries, { mediaQueriesKeys } from './const/mediaQueries'

const behaviors = ['down', 'up', 'only']

function parseResponsivePropName(propName) {
  const sanitizedPropName = propName.replace(/[A-Z]/g, (capitalLetter) => {
    return `-${capitalLetter}`.toLowerCase()
  })
  const splitPropName = sanitizedPropName.split('-')

  const res = splitPropName.reduce(
    (acc, part, index) => {
      if (mediaQueriesKeys.includes(part)) {
        acc.mediaQuery = part
        return acc
      }

      if (behaviors.includes(part)) {
        acc.behavior = part
        return acc
      }

      acc.propName +=
        index > 0
          ? part.slice(0, 1).toUpperCase() + part.slice(1, part.length)
          : part
      return acc
    },
    { propName: '', mediaQuery: null, behavior: null },
  )

  console.log({ res })

  return res
}

function getMediaQuery(mediaQuery, behavior) {
  const mediaQueryIndex = mediaQueriesKeys.indexOf(mediaQuery)
  const screenSize = mediaQueries[mediaQuery]
  const prevMediaQuery = mediaQueriesKeys[mediaQueryIndex - 1]
  const prevScreenSize = mediaQueries[prevMediaQuery]

  if (behavior === 'down') {
    return `(max-width: ${screenSize}px)`
  }

  if (behavior === 'up') {
    return `(min-width: ${screenSize}px)`
  }

  return `(min-width: ${prevScreenSize}px) and (max-width: ${screenSize}px)`
}

function applyCssProps(props, propValue, mediaQuery, behavior) {
  const propsLinesArr = props.map((propName) => {
    return `${propName}:${propValue};`
  })

  let propsCss = propsLinesArr.join('')

  if (mediaQuery) {
    const query = getMediaQuery(mediaQuery, behavior)
    propsCss = `@media ${query} {${propsCss}}`
  }

  return propsCss
}

export default function applyStyles(pristineProps) {
  const res = Object.keys(pristineProps).reduce((acc, pristinePropName) => {
    let nextAcc = acc

    const { propName, mediaQuery, behavior } = parseResponsivePropName(
      pristinePropName,
    )

    const aliasOptions = propAliases[propName]

    if (!aliasOptions) {
      return nextAcc
    }

    const { props, transformValue } = aliasOptions
    const propValue = pristineProps[pristinePropName]
    const transformedPropValue = transformValue
      ? transformValue(propValue)
      : propValue

    const css = applyCssProps(props, transformedPropValue, mediaQuery, behavior)

    return nextAcc.concat(css)
  }, [])

  const f = res.join(' ')
  console.warn(f)

  return f
}
