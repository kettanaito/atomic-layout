export default function isset(variable: any): boolean {
  return typeof variable !== 'undefined' && variable !== null
}
