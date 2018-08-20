import React, { Component } from "react";
import { Grid, Image, Icon, Container, Header } from "semantic-ui-react";
import "./Home.css";


export default class Home extends Component {
  render() {
    return (

      <div style={{ paddingTop: "4em" }} >
        <Image
          src="https://avatars2.githubusercontent.com/u/7285926?s=460&v=4"
          centered
          size="small"
          circular
        />


        <Container textAlign="center">
          <Header style={{ paddingTop: "0.5em", marginBottom: 0, fontSize: "2.5rem" }} as='h1'>Julian Beck</Header>
          <p style={{ fontSize: "1.5rem", marginBottom: "0.1em" }}> Computer Science Student</p>
          <p style={{ fontSize: "1rem" }}> Intrested in full Stack development & languages</p>


          <Grid centered style={{ marginTop: "0.1em" }} >
            <a style={{ color: "inherit" }} href="https://google.com">
              <Icon size="big" name="github" />Code</a>
            <a style={{ color: "inherit" }} href="https://google.com">
              <Icon size="big" name="linkedin" />linkedIn</a>
            <a style={{ color: "inherit" }} href="https://google.com">
              <Icon size="big" name="twitter" />Tweets</a>
          </Grid>
        </Container>
      </div>
    )
  }
}
