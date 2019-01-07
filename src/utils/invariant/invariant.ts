export default function invariant(
  variable: any,
  message: string,
  ...messageArgs: any[]
): void {
  if (!variable) {
    console.error(message, ...messageArgs)
  }
}
