import React from 'react'
import { Composition } from 'atomic-layout'

const Logo = () => <span>Logo</span>
const Menu = () => <span>Menu</span>

const Namespaces = () => (
  <Composition id="composition" areas="logo menu">
    {(Areas) => (
      <>
        <Areas.Logo data-area="logo">
          <Logo />
        </Areas.Logo>
        <Areas.Menu data-area="menu">
          <Menu />
        </Areas.Menu>
      </>
    )}
  </Composition>
)

export default Namespaces
