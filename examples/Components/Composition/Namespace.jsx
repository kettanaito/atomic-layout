import React from 'react'
import { Composition } from 'atomic-layout'

const Logo = () => <span>Logo</span>
const Menu = () => <span>Menu</span>

const Namespaces = () => (
  <Composition id="composition" areas="logo menu actions">
    {({ Areas, Actions }) => (
      <>
        <Areas.Logo data-area="logo">
          <Logo />
        </Areas.Logo>
        <Areas.Menu data-area="menu">
          <Menu />
        </Areas.Menu>
        <Actions data-area="actions">
          <span>Actions</span>
        </Actions>
      </>
    )}
  </Composition>
)

export default Namespaces
