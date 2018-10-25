import React from 'react'
import Layout from 'atomic-layout'
import Notch from '../behavior/Notch'

export default class CustomUnit extends React.Component {
  componentWillMount() {
    Layout.configure({
      defaultUnit: 'rem',
    })
  }

  render() {
    return <Notch />
  }
}
