import React, { Component } from "react";
import { Container, Header } from 'semantic-ui-react';
import Markdown from "react-markdown";
import Data from "../../data/blogs";

export default class Entries extends Component {
 
  render() {
    return (
      <Container style={{ paddingTop: "3em" }}>
        <Header size="huge">{Data[this.props.match.params.id].title}</Header>
        <Markdown source={Data[this.props.match.params.id].description}></Markdown>
      </Container>
    )
  }
}
