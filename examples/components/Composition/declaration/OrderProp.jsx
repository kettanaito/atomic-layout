import React from 'react'
import { Composition, Box } from 'atomic-layout'
import Square from '@stories/Square'

const OrderPropExample = () => {
  return (
    <>
      <h2>Template-less composition</h2>
      <p>
        Template-less Composition should respect a custom <code>order</code>{' '}
        prop of its children.
      </p>
      <Composition id="template-less-composition" gap={10}>
        <Box as={Square} id="box-first">
          First
        </Box>
        <Box as={Square} id="box-second">
          Second
        </Box>
        <Box as={Square} id="box-third" order={-1}>
          Third
        </Box>
      </Composition>

      <h2>Regular composition</h2>
      <p>
        When given explicit <code>areas</code>/<code>template</code> prop,
        Composition should ignore any given <code>order</code> prop on its
        children areas, and always render according to the template.
      </p>
      <Composition id="regular-composition" areas="left center right" gap={10}>
        {(Areas) => (
          <>
            <Areas.Left data-area="left">
              <Square>Left</Square>
            </Areas.Left>
            <Areas.Center data-area="center">
              <Square>Center</Square>
            </Areas.Center>
            <Areas.Right data-area="right" order={-1}>
              <Square>Right</Square>
            </Areas.Right>
          </>
        )}
      </Composition>
    </>
  )
}

export default OrderPropExample
