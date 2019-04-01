export default function when(
  predicate: (...args: any[]) => boolean,
  whenTrueFunc: (...args: any[]) => any,
) {
  return (args: any) => (predicate(args) ? whenTrueFunc(args) : args)
}
