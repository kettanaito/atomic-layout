import React from 'react'
import { storiesOf } from '@storybook/react'

import Playground from './Playground'
import Demo from './Demo'
import Behavior from './behavior/Default'
import Github from './Github'

storiesOf('Stories', module)
  .add('Playground', () => <Playground />)
  .add('Demo', () => <Demo />)
  .add('Behavior', () => <Behavior />)

storiesOf('GitHub', module).add('Front-page', () => <Github />)
