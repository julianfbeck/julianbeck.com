import React from 'react';
import Item from "./Item";


function List(props) {
  return (
    <div>
      {props.entries.map((e, i) => <Item key={i} id={i} title={e.title} description={e.description} date={e.date} />)}
    </div>

  );
}



export default List
