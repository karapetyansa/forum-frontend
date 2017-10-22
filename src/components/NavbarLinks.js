import React from 'react'
import { Link } from 'react-router-dom'

const links = [
  { name: 'Home', link: '', key: 1, home: true },
  { name: 'Posts', link: 'posts', key: 2 },
  { name: 'Persons', link: 'persons', key: 3 },
  { name: 'Commits', link: 'commits', key: 4 },
  { name: 'About', link: 'about', key: 5 }
]

const toLink = (pathName = '/') => ({ name, link, key }) => (
  <Link
    className={`nav-link ${pathName.split('/')[1] === link ? 'active' : ''}`}
    to={'/' + link}
    key={key}
  >
    {name}
  </Link>
)

const NavbarLinks = props => (
  <nav className="nav blog-nav">
    {links.map(toLink(props.location.pathname))}
  </nav>
)
export default NavbarLinks
