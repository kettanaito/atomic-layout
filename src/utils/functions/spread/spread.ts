export default function spread(func: (...args: any[]) => any) {
  return (args: any) => func.apply(null, args)
}
