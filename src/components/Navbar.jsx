import React, { Component } from "react";
import { Menu, Container } from 'semantic-ui-react'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "../scenes/Home/Home";
import Blog from "../scenes/Blog/Blog";
import Contact from "../scenes/Contact/Contact";
import Entries from "../scenes/Entries/Entries";
import ReactGA from "react-ga";

ReactGA.initialize('UA-123121612-1');
ReactGA.pageview(window.location.pathname + window.location.search);

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div style={{ maxWidth: "70%", alignContent: "center"  ,marginLeft: "auto",marginRight: "auto"}}>
            <Menu stackable pointing secondary size="large" >
              <Menu.Item
                name='Home' exact as={NavLink} to="/"
              />
              <Menu.Item
                name='Blog' as={NavLink} to="/blog"
              />
              <Menu.Item
                name='Contact' as={NavLink} to="/contact"
              />
            </Menu>
          </div>
          <Container text>
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
