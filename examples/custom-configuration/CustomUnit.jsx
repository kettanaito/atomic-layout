import React from 'react'
import Layout from 'atomic-layout'
import Bell from '../behavior/Bell'

export default class CustomUnit extends React.Component {
  componentWillMount() {
    Layout.configure({
      defaultUnit: 'rem',
    })
  }

  render() {
    return <Bell />
  }
}
