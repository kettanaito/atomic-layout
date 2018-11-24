import React from 'react'
import { Composition } from '../'

const template = `
  header header header
  main main main
  . . .
  secondary secondary secondary
  footer footer footer
`

const nextTemplate = `
header footer
main secondary
`

export default class PeriodExample extends React.Component {
  constructor() {
    super()
    this.state = {
      template,
    }
  }

  render() {
    const { template } = this.state
    return (
      <React.Fragment>
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

        <span onClick={() => this.setState({ template: nextTemplate })}>
          Change template
        </span>
      </React.Fragment>
    )
  }
}
