import url from 'url'
import React from 'react'
import { Composition } from 'atomic-layout'

class PropAliases extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps) {
    const { propValue, ...parsedUrl } = url.parse(
      nextProps.location.search,
      true,
    ).query
    const numericValue = Number(propValue)

    return {
      ...parsedUrl,
      propValue: isNaN(numericValue) ? propValue : numericValue,
    }
  }

  render() {
    const { propAlias, propValue } = this.state
    const props = {
      [propAlias]: propValue,
    }

    return (
      <Composition template="first" {...props} id="composition">
        {({ First }) => <First>{propAlias}</First>}
      </Composition>
    )
  }
}

export default PropAliases
