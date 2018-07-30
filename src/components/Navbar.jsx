import React, { Component } from "react";
import { Menu,Container } from 'semantic-ui-react'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "../scenes/Home/Home";
import Blog from "../scenes/Blog/Blog";
import Contact from "../scenes/Contact/Contact";
import Entries from "../scenes/Entries/Entries";

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
          <Container>
            <Route exact path="/" component={Home} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/blog/:id" component={Entries} />
            <Route path="/contact" component={Contact} />
          </Container>
        </div>
      </HashRouter>
    )
  }
}
