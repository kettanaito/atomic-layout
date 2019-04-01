import { addParameters, configure } from '@storybook/react'

addParameters({
  options: {
    name: 'Atomic layout',
    showAddonPanel: false,
    showSearchBox: false,
    isToolshown: false,
  },
})

configure(() => require('../examples'), module)
