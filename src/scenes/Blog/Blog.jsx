import React, { Component } from "react";
import List from "./components/List";
import blogs from "../../data/blogs";
import ionic from "../../data/ionic";

export default class Blog extends Component {
  render() {
    return (
      <div>
        <List blogs={blogs} ionic={ionic} />        
      </div>
    )
  }
}
