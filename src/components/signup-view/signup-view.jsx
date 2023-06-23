import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {event.preventDefault();
  const data = { Username: username, Password: password, Email: email, Birthday : birthday };
 
  //fetch("http://localhost:1234/users", {
  //fetch(`https://90smovies.vercel.app/users`, {
  fetch(`https://nine0smovieapi-oyws.onrender.com/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.ok) {
      alert("Signup successfull");
      navigate("/movies");
    } else {
      alert("Signup failed");
    }
  });
};

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
      <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username}
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
        
      <Form.Group>
      <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      
      <Form.Group>
      <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      
      <Button variant="light" type="submit">Submit</Button>
    </Form>
  );
};