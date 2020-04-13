import React from 'react'
import { Numeric } from '@atomic-layout/core'
import useResponsiveProps from '../hooks/useResponsiveProps'

/**
 * Returns a new React component based on the given one
 * that enables support for Responsive Props API on arbitrary props.
 */
export function makeResponsive<
  OwnProps extends Record<string, any>,
  ResponsiveProps extends Record<string, Numeric>,
  RefType = unknown
>(
  Component: React.FC<OwnProps>,
): React.FC<React.PropsWithoutRef<OwnProps & Partial<ResponsiveProps>>> {
  return React.forwardRef<RefType, OwnProps & Partial<ResponsiveProps>>(
    (responsiveProps, ref) => {
      /**
       * @see https://github.com/Microsoft/TypeScript/issues/29049
       */
      const actualProps = useResponsiveProps<typeof responsiveProps>(
        responsiveProps,
      ) as OwnProps & Partial<ResponsiveProps>

      return <Component ref={ref} {...actualProps} />
    },
  )
}
