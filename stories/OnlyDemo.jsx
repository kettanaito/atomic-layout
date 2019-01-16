import React from 'react'
import { Only } from '../lib'

export default class OnlyDemo extends React.Component {
  render() {
    return (
      <>
        <Only to="md">Up to MD</Only>
        <Only from="md">From MD and up</Only>
        <Only for="xs">XS only</Only>
        <Only for="sm">SM only</Only>
        <Only for="md">MD only</Only>
        <Only for="lg">LG only</Only>
        <Only from="sm" to="lg">
          From SM to LG
        </Only>
        <Only except from="sm" to="lg">
          Everywhere except SM and LG
        </Only>
      </>
    )
  }
}
