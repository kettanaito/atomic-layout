// @flow

/*
  might be overkill to have a separate file for this but I'm
  just going to assume that the pattern a template prop can
  have might get more complex over time

  what is not overkill however is having this function defined
  separately since this function is basically a runtime-potent
  boolean and we don't want to re-instantiate it every time it's
  needed
*/
export default (propKey: string): boolean =>
  (/^template/).test(propKey)
