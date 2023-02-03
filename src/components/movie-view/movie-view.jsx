import React from "react";
import { Card, Col, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Col md={8}>
      <Card>
        <Card.Img variant="top" src={movie.Image} />
        <Card.Body>
          <Card.Text>Title: {movie.Title}</Card.Text>
          <Card.Text>Year: {movie.Year}</Card.Text>
          <Card.Text>Director: {movie.Director.Name}</Card.Text>
          <Card.Text>Bio: {movie.Director.Bio}</Card.Text>
          <Card.Text>Description: {movie.Description}</Card.Text>

          <Button variant="light" onClick={onBackClick}>Back to list</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};