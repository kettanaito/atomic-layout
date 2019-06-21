import React from 'react'
import { Composition } from 'atomic-layout'

const Logo = () => <span>Logo</span>
const Menu = () => <span>Menu</span>

const Namespaces = () => (
  <Composition areas="logo menu actions">
    {({ Areas }) => (
      <>
        <Areas.Logo>
          <Logo />
        </Areas.Logo>
        <Areas.Menu>
          <Menu />
        </Areas.Menu>
        <Areas.Actions>
          <span>Actions</span>
        </Areas.Actions>
      </>
    )}
  </Composition>
)

export default Namespaces
