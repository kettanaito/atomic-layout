import React from 'react'
import { storiesOf } from '@storybook/react'
import './styles.css'
import * as sc from 'styled-components'

console.log({ sc }, 2)

import Playground from './Playground'
import Demo from './Demo'
import PeriodExample from './PeriodExample'
import * as lib from '../'

console.log({ lib })

storiesOf('Stories', module)
  .add('Playground', () => <Playground />)
  .add('Demo', () => <Demo />)
  .add('Period', () => <PeriodExample />)
