// @flow
/**
 * Returns the copy of the given object with only those keys which
 * satisfy one of the given predicate strings/RegExps.
 */
export default function pick(predicate: Array<RegExp | string>) {
  const testPredicate = (propName) =>
    predicate.some(
      (comparator) =>
        typeof comparator === 'string'
          ? comparator === propName
          : comparator.test(propName),
    )

  return (obj: Object): Object =>
    Object.keys(obj)
      .filter(testPredicate)
      .reduce(
        (picked: Object, propName) => ({
          ...picked,
          [propName]: obj[propName],
        }),
        {},
      )
}
