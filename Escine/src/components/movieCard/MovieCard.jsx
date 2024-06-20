import React from 'react';
import Card from 'react-bootstrap/Card'; //que pijas es esto?
import Button from 'react-bootstrap/Button';

const MovieCard = ({ title, description, price, thumbnail, status }) => {
    return (
        <Card>
            <Card.Img variant="top" src={thumbnail} alt={title} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>Price: ${price}</Card.Text>
                <Button variant={status ? "success" : "danger"}>{status ? "Available" : "Not Available"}</Button>
            </Card.Body>
        </Card>
    );
};

export default MovieCard;
