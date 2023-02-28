import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const LoginView = ({ onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {event.preventDefault(); // prevent reloading the entire page
  const data = { Username: username, Password: password };

    fetch("https://90s-movie-api-sophme.vercel.app/login", {    // my API
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)              // response with JSON object so code can extract JWT 
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user)); // put user and token in local storage to avoid new login request 
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);    // send unser and token to MainView
      } else {
        alert("User does not exist");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
}

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
      <Button variant="light" type="submit">Submit</Button>
    </Form>
  );
};