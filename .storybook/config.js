import { addParameters, configure } from '@storybook/react'

addParameters({
  options: {
    brandName: 'Atomic layout',
    brandUrl: 'https://github.com/kettanaito/atomic-layout',
    showPanel: false,
    isToolshown: false,
  },
})

configure(() => require('../examples'), module)
