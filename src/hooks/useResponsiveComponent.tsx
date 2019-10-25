import React from 'react'
import useResponsiveProps from './useResponsiveProps'
import { Numeric } from '@src/const/defaultOptions'

/**
 * Returns a copy of the given React component
 * that supports Responsive Props API.
 */
function useResponsiveComponent<
  OwnProps extends Record<string, any>,
  ResponsiveProps extends Record<string, Numeric>
>(
  Component: React.FunctionComponent<OwnProps>,
): React.FunctionComponent<OwnProps & Partial<ResponsiveProps>> {
  return (responsiveProps) => {
    /**
     * @see https://github.com/Microsoft/TypeScript/issues/29049
     */
    const actualProps = useResponsiveProps<typeof responsiveProps>(
      responsiveProps,
    ) as OwnProps & Partial<ResponsiveProps>

    return <Component {...actualProps} />
  }
}

export default useResponsiveComponent
