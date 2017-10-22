import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import PostsPage from './components/PostsPage'
import './blog.css'

const App = () => (
  <div>
    <Route path="/" component={Navbar} />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/posts" component={PostsPage} />
    </Switch>
  </div>
)
export default App
