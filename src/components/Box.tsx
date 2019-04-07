import * as React from 'react'
import Layout from '../Layout'
import { GenericProps } from '@const/props'
import applyStyles from '@utils/styles/applyStyles'

export interface BoxProps extends GenericProps {
  [propName: string]: any
  flex?: boolean
  inline?: boolean
}

const Box: React.FunctionComponent<BoxProps> = Layout.options.produceStyles.div<
  BoxProps
>`
  && {
    ${applyStyles};
    display: ${({ flex, inline }) =>
      flex
        ? inline
          ? 'inline-flex'
          : 'flex'
        : inline
        ? 'inline-block'
        : 'block'};
  }
`

export default Box
