export default function invariant(variable: any, message: string): void {
  if (!variable) {
    throw new Error(message)
  }
}
