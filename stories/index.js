import React from 'react'
import { storiesOf } from '@storybook/react'
import './styles.css'

import Playground from './Playground'
import Demo from './Demo'
import PeriodExample from './PeriodExample'

storiesOf('Stories', module)
  .add('Playground', () => <Playground />)
  .add('Demo', () => <Demo />)
  .add('Period', () => <PeriodExample />)
