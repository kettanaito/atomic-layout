// @flow
import type { TFunc } from '../compose'
type TPredicate = (...args: mixed[]) => boolean

export default function when(predicate: TPredicate, whenTrueFunc: TFunc) {
  return (args: mixed) => (predicate(args) ? whenTrueFunc(args) : args)
}
