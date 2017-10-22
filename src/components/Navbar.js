import React, { Component } from 'react'
import NavbarLinks from './NavbarLinks'

class Navbar extends Component {
  state = {
    isCollapsed: true
  }

  toggleExpand = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }

  render() {
    return (
      <div className="blog-masthead ">
        <div className="container">
          <NavbarLinks {...this.props} />
        </div>
      </div>
    )
  }
}
export default Navbar
