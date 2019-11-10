import { addParameters, configure } from '@storybook/react'

addParameters({
  options: {
    brandName: 'Atomic Layout',
    brandUrl: 'https://github.com/kettanaito/atomic-layout',
  },
})

configure(() => require('../examples'), module)
