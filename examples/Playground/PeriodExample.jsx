import React from 'react'
import Layout, { Composition } from 'atomic-layout'

Layout.configure({})

const templateBox = `
thumbnail
heading
channelName
meta
`

const templateRow = `
thumbnail heading heading
thumbnail channelName meta
thumbnail description description
`

const Video = ({ isBox, title, channelName, views, description }) => (
  <Composition
    areas={isBox ? templateBox : templateRow}
    templateCols={!isBox && '200px auto 1fr'}
    templateRows={!isBox && 'auto auto 1fr'}
    gutter={10}
  >
    {({ Thumbnail, Heading, ChannelName, Meta, Description }) => (
      <React.Fragment>
        <Thumbnail>
          <img src="https://satyr.io/300x225" style={{ maxWidth: '100%' }} />
        </Thumbnail>
        <Heading>
          <h3 style={{ margin: 0 }}>{title}</h3>
        </Heading>
        <ChannelName as="span">{channelName}</ChannelName>
        <Meta as="span">{views}</Meta>
        <Description as="span">{description}</Description>
      </React.Fragment>
    )}
  </Composition>
)

export default class PeriodExample extends React.Component {
  constructor() {
    super()
    this.state = {
      hasDefaultTemplate: true,
    }
  }

  render() {
    const { hasDefaultTemplate } = this.state

    return (
      <React.Fragment>
        <button
          onClick={() =>
            this.setState(({ hasDefaultTemplate }) => ({
              hasDefaultTemplate: !hasDefaultTemplate,
            }))
          }
        >
          Toggle layout
        </button>
        <br />
        <br />

        <Composition
          templateCols={hasDefaultTemplate && 'repeat(auto-fit, 250px)'}
          gutter={10}
        >
          <Video
            isBox={hasDefaultTemplate}
            title="React for beginners"
            channelName="Udemy"
            views="851 views"
            description="Lorem ipsum dolor sit amet"
          />
          <Video
            isBox={hasDefaultTemplate}
            title="React for beginners"
            channelName="Udemy"
            views="851 views"
            description="Lorem ipsum dolor sit amet"
          />
          <Video
            isBox={hasDefaultTemplate}
            title="React for beginners"
            channelName="Udemy"
            views="851 views"
            description="Lorem ipsum dolor sit amet"
          />
        </Composition>
      </React.Fragment>
    )
  }
}
