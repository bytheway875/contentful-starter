import React from 'react'
import Link from 'gatsby-link'
import base from './base.css'
import Container from '../container'
import Navigation from '../navigation'

// If you don't mind the navigation re-rendering on every route change, you can
// wrap each page in a layout component instead of using the layout in the
// layout directory.
class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation />
        {children()}
      </Container>
    )
  }
}

export default Template
