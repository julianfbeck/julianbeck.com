import React from 'react';
import Item from "./Item";
import App from "./LiveApp";

import { Card, Header,Divider} from 'semantic-ui-react';



function List(props) {
  return (
    <div>
      <Header size="huge" style={{ paddingTop: "2em" }}>Blog</Header>
      <Divider/>
      <Card.Group centered>
        {props.blogs.map((e, i) => <Item key={i} id={i} title={e.title} description={e.description} date={e.date} />)}
      </Card.Group>
      <Header size="huge" style={{ paddingTop: "2em" }}>Ionic Apps</Header>
      <Divider />
      <Card.Group centered>
        {props.ionic.map((e, i) => <App key={i} id={i} title={e.title} description={e.description} code={e.code} link={e.link} store={e.store} />)}
      </Card.Group>
    </div>
  );
}



export default List
