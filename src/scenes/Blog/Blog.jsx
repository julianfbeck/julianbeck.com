import React, { Component } from "react";
import List from "./components/List";
import data from "../../store";
export default class Blog extends Component {
  render() {
    return (
      <div>
        <List entries={data} />
      </div>
    )
  }
}
