import React from 'react'
import useResponsiveProps from './useResponsiveProps'

/**
 * Returns a copy of the given React component
 * that supports Responsive Props API.
 */
function useResponsiveComponent<
  OwnProps = Record<string, any>,
  ResponsiveProps = Record<string, any>
>(
  Component: React.FunctionComponent<OwnProps>,
): React.FunctionComponent<OwnProps & Partial<ResponsiveProps>> {
  return (responsiveProps) => {
    /**
     * @todo Typing this needs some help.
     */
    const actualProps: any = useResponsiveProps(responsiveProps)
    return <Component {...actualProps} />
  }
}

export default useResponsiveComponent
