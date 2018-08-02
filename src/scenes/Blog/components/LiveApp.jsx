import React from "react";
import PropTypes from "prop-types";
import {Card,Icon} from "semantic-ui-react";

const App = (props) => (
    <Card href={props.link}>
        <iframe height="500" frameBorder="0" src={props.link} title={props.title} > </iframe>
        <Card.Content>
            <Card.Header>{props.title}</Card.Header>
            <Card.Description>{props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a href={props.store}>
                <Icon name='android' />
                PlayStore
            </a> <br/>
            <a href={props.code}>
                <Icon name='github' />
                code
             </a>
        </Card.Content>
    </Card>
);

App.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
};

export default App;