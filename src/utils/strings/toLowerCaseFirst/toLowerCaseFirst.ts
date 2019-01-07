export default function toLowerCaseFirst<R = string>(str: string): R {
  return (str.slice(0, 1).toLowerCase() + str.slice(1, str.length)) as any
}
