// @flow
export default function pick(predicate: Array<RegExp | string>) {
  const testPredicate = (propName) => {
    return predicate.some(
      (condition) =>
        typeof condition === 'string'
          ? condition === propName
          : condition.test(propName),
    )
  }

  return (obj: Object): Object => {
    return Object.keys(obj).reduce((picked: Object, propName) => {
      return testPredicate(propName)
        ? { ...picked, [propName]: obj[propName] }
        : picked
    }, {})
  }
}
