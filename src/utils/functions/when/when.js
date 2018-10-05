// @flow
import type { Func } from '../compose'
type PredicateFunc = (...args: mixed[]) => boolean

export default function when(predicate: PredicateFunc, whenTrueFunc: Func) {
  return (args: mixed) => (predicate(args) ? whenTrueFunc(args) : args)
}
