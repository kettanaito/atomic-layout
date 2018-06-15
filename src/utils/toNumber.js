// @flow
export default function toNumber(value: any): number {
  return Number.isInteger(value) ? value : parseFloat(value)
}
