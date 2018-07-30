import React, { Component } from "react";
import {Container } from 'semantic-ui-react';
import Markdown from "react-markdown";
export default class Entries extends Component {
  render() {
    return (
      <Container>
      <Markdown source="# Hallo"></Markdown>
      </Container>
    )
  }
}
