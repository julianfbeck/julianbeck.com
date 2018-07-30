import React, { Component } from "react";
import List from "./components/List";
import { Link } from "react-router-dom";

export default class Blog extends Component {
  render() {
    const { match } = this.props
    return (
      <div>
        <List />

      </div>
    )
  }
}
