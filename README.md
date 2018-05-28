# atomic-layout

## What is this?

A single component to distribute the spacial relation in your layouts, inspired by [Atomic design](http://bradfrost.com/blog/post/atomic-web-design) composition.

## Why?

Because contextually adding spacial properties to atom components makes them contextual, which kills the purpose of atom components. Instead, you can design layouts using the composition of areas, describing their relation.

## How does it work?

It's a marvellous synergy of incredible (and standardized) CSS Grid and React.

## Motivation

[Atomic design](http://bradfrost.com/blog/post/atomic-web-design) is outstanding. If this is the first time you hear about it, go check it out and don't forget to show it to your designer as well.

Implementation of atom components is quite straightforward, but when it comes to composing the molecules how do you handle the relation between the atoms? Most likely, you are writing some extra CSS to change the position or add spacing to the atoms, which are under a specific molecule. Not only that makes you write more CSS, but it also contradicts the idea of an atom being independant, reusable, predictable.

**_What if there was a single layer above the atoms that could distribute the spacial relation between them without actually affecting them?_** And wouldn't it be great if that layer could be applied not only to the atoms, but also to molecules, templates, layouts?

Well, this is what `atomic-layout` is about.

## How does this work?

We are using a jaw-droppingly powerful (and standardized) [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) and combining it with the simplicity and flexibility of [React](https://reactjs.org/). You can depict this library as an easier way of declaring and maintaining CSS Grid in your React applications.

## Getting started

```jsx
import React from 'react'
import Layout from 'atomic-layout'

// declare template areas ("grid-template-areas")
const templateMobile = `
  'thumbnail'
  'heading'
  'subheading'
`

// including for different screen sizes
const templateDesktop = `
  'thumbnail heading'
  'thumbnail subheading'
`

export default class Card extends React.Component {
  render() {
    return (
      <Layout template={templateMobile} templateSmUp={templateDesktop}>
        {/* Get React components based on your grid areas */}
        {({ Thumbnail, Heading, Subheading }) => (
          <React.Fragment>
            <Thumbnail>
              <img src="foo.png" />
            </Thumbnail>
            <Heading>
              <h4>Juicy fruits</h4>
            </Heading>
            <Subheading>
              <p>Healthy mind in a healthy body.</p>
            </Subheading>
          </React.Fragment>
        )}
      </Layout>
    )
  }
}
```

## Support

See the [Support table](https://caniuse.com/#feat=css-grid).
