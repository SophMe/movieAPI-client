import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { Username: username, Password: password };

    fetch('http://LB-26-14148712.eu-central-1.elb.amazonaws.com/login', {
    // fetch('http://localhost:8080/login', {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://LB-26-14148712.eu-central-1.elb.amazonaws.com/",
        // "Access-Control-Allow-Origin": "http://localhost:8080/",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("User does not exist");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="light" type="submit">
        Submit
      </Button>
    </Form>
  );
};
