import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Item = (props) => (
    <Card as={Link} to={`blog/${props.id}`}>
        <Card.Content header={props.title} />
        <Card.Content description={props.description} />
        <Card.Content extra>
            <Icon name="user" />
            {props.date}
        </Card.Content>
    </Card>
);

Item.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
};

export default Item;