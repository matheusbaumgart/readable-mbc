import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import HomePage from './pages/Home'
import CategoryPage from './pages/Category'
import PostPage from './pages/Post'

class App extends Component {

  render() {

    return (

      <Router>
        <div className="App">

          <header className="header">
            <Link to="/">Welcome to Diariamente</Link>
          </header>

          <div className="container">

            <Route exact path="/" component={HomePage} />
            <Route exact path="/:category" component={CategoryPage} />
            <Route exact path="/:category/:post_id" component={PostPage} />

          </div>
        </div>
      </Router>

    );
  }
}

export default App