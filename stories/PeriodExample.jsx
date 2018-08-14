import React from 'react'
import { Composition } from '../'

const template = `
  header header header
  main main main
  . . .
  secondary secondary secondary
  footer footer footer
`

export default class PeriodExample extends React.Component {
  render() {
    return (
      <Composition template={template}>
        {({ Header, Main, Secondary, Footer }) => (
          <React.Fragment>
            <Header>Header</Header>
            <Main>Main</Main>
            <p>something</p>
            <Secondary>Secondary</Secondary>
            <Footer>Footer</Footer>
          </React.Fragment>
        )}
      </Composition>
    )
  }
}
