/**
 * Box is a primitive that supports various props shorthands
 * (i.e. "paddingHorizontal", "marginVertical", etc.) and is used
 * for generic space distribution.
 */
import React from 'react'
import styled from 'styled-components'
import applyStyles from '../utils/applyStyles'

const Box = styled.div`
  ${(props) => applyStyles(props)};
`

export default Box
