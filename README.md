A single component to distribute spacial relation between your atom components.

## Motivation

[Atomic design](http://bradfrost.com/blog/post/atomic-web-design) is outstanding. A bunch of atoms composing a molecule, which composes an organism and, finally, the whole page.

While the implementation of atoms is fairly straightforward, when it comes to molecules there is a question on how to declare the relation between the atoms. People often end up writing more CSS to append molecule-specific styles to our atoms to change their positioning or add spacing. That changes the behavior of the atom to suit this very molecule. That is against the atom's principle.

Wouldn't it be great to have a single component dedicated to distributing that spacial relation between atoms, without actually touching them? Well, this is what this package is about.

### How does this work?

First, we take [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout), which is jaw-droppingly powerful layout concept from the CSS spec, and then we combine it with simplicity and versatility of [React](https://reactjs.org/).

## Support

See the [Support table](https://caniuse.com/#feat=css-grid).
