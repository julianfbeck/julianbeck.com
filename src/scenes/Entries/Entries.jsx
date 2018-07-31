import React, { Component } from "react";
import { Container } from 'semantic-ui-react';
import Markdown from "react-markdown";
import Data from "../../store"
export default class Entries extends Component {
  render() {
    return (
      <Container>
        <Markdown source={Data[this.props.match.params.id].description}></Markdown>
      </Container>
    )
  }
}
