import * as React from 'react'
import { Breakpoint, AreaComponent, GenericProps } from '@atomic-layout/core'
import MediaQuery from '../components/MediaQuery'

/**
 * Wraps the given area component in a placeholder.
 * This is used for conditional components, where placeholder component is rendered
 * until the condition for the area component is met (i.e. breakpoint).
 */
export const withPlaceholder = (
  Component: AreaComponent,
  breakpoints: Breakpoint[],
) => {
  const Placeholder: React.FC<GenericProps> = ({ children, ...restProps }) => {
    const PlaceholderComponent = breakpoints.reduce<JSX.Element[]>(
      (components, breakpoint, index) => {
        return components.concat(
          <MediaQuery {...breakpoint} key={`${Component.displayName}_${index}`}>
            {(matches) =>
              matches && <Component {...restProps}>{children}</Component>
            }
          </MediaQuery>,
        )
      },
      [],
    )

    // Wrapping in a Fragment due to a type issue
    // when returning JSX.Element[].
    return <>{PlaceholderComponent}</>
  }

  Placeholder.displayName = `Placeholder(${Component.displayName})`

  return Placeholder
}
