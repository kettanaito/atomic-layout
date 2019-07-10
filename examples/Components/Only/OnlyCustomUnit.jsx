import React from 'react'
import Layout, { Composition } from 'atomic-layout'
import OnlyDefault from './OnlyDefault'

export default class OnlyCustomUnit extends React.Component {
  componentWillMount() {
    Layout.configure({
      defaultUnit: 'rem',
    })
  }

  render() {
    return (
      <Composition gap={2}>
        <OnlyDefault />
      </Composition>
    )
  }
}
