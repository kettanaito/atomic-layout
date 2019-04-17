import React from 'react'
import Layout from 'atomic-layout'
import Notch from '../Rendering/Notch'

export default class CustomUnit extends React.Component {
  componentDidMount() {
    Layout.configure({
      defaultUnit: 'rem',
    })
  }

  render() {
    return <Notch />
  }
}
