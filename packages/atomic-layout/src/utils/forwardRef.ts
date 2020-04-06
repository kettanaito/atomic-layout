import * as React from 'react'

export const forwardRef = <RefType, Props>(
  component: React.RefForwardingComponent<RefType, Props>,
): React.FC<Props & { ref?: RefType }> => {
  return React.forwardRef<RefType, any>(component)
}
