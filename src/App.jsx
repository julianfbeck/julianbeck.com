import React, { Component } from "react";
import { Menu } from 'semantic-ui-react'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Contact from "./Contact";

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Menu pointing secondary size="large">
            <Menu.Item
              name='Home' exact  as={NavLink} to="/"

            />
            <Menu.Item
              name='Blog' as={NavLink} to="/blog"

            />
            <Menu.Item
              name='Contact' as={NavLink} to="/contact"
            />
          </Menu>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} />
          </div>
        </div>
      </HashRouter>
    )
  }
}
