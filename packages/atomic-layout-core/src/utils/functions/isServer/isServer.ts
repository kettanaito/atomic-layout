/**
 * Function that checks if the code is running on the node env or the client
 * @returns {boolean}
 */
export default function isServer(): boolean {
  return !(typeof window != 'undefined' && window.document)
}
