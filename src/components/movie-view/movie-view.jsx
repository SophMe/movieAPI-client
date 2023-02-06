import React from "react";
import { Card, Col, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Col md={8}>
      <Card border="light">
        <Card.Img className="rounded" variant="bottom" src={movie.Image} alt="movie poster" style={{width: "300px"}}/>
        <Card.Body>
          <Card.Text>Title: {movie.Title}</Card.Text>
          <Card.Text>Year: {movie.Year}</Card.Text>
          <Card.Text>Description: <br />{movie.Description}</Card.Text>
          <Card.Text>Director: {movie.Director.Name}</Card.Text>
          <Card.Text>Bio: <br />{movie.Director.Bio}</Card.Text>

          <Button variant="light" onClick={onBackClick}>Back to list</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};