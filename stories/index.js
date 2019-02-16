import React from 'react'
import { storiesOf } from '@storybook/react'
import './styles.css'

import Playground from './Playground'
import Demo from './Demo'
import PeriodExample from './PeriodExample'
import OnlyDemo from './OnlyDemo'
import MediaQuery from './MediaQuery'

storiesOf('Stories', module)
  .add('Playground', () => <Playground />)
  .add('Demo', () => <Demo />)
  .add('Period', () => <PeriodExample />)
  .add('OnlyDemo', () => <OnlyDemo />)
  .add('MediaQuery', () => <MediaQuery />)
