import React, { Component } from "react";
import { Form, Button,Header } from "semantic-ui-react";

export default class Contact extends Component {
  render() {
    return (
      <div style={{ paddingTop: "4em" }} className="contact" >
        <Header size="huge">Contact me</Header>
        <Form method="POST" action="https://formspree.io/Kickbeck@googlemail.com">
          <Form.Field>
            <label>Email</label>
            <input required type="email" name="email" placeholder="Your email" />
          </Form.Field>
          <Form.Field>
            <Form.TextArea required label='message' name="message" className="message" placeholder='your Message' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}