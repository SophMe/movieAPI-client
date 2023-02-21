import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

export const UpdateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {event.preventDefault();
  const data = { Username: username, Password: password, Email: email, Birthday : birthday };

  //fetch("http://localhost:1234/users", {
  fetch(`https://90s-movie-api-sophme.vercel.app/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.ok) {
      alert("Update successfull");
      window.location.reload();
    } else {
      alert("Update failed");
    }
  });
};

const deleteUser = (username) => {
  fetch(`https://90s-movie-api-sophme.vercel.app/users`, {
  method: "DELETE",
})
.then((result)=>{
  result.json().then((resp)=>{
    console.warn(resp)
  })
})
};

  return (
    <>
    <Card>
      <Card.Title>Update Profile</Card.Title>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
          <Form.Label>Username:</Form.Label>
            <Form.Control 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            />
          </Form.Group>

          <Form.Group>
          <Form.Label>New password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>
            
          <Form.Group>
          <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group>
      {/* Leave this here? */}
          <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          
          <Button onClick={UpdateUser} variant="light" type="submit">Update</Button>
          <Button variant="light" type="submit">Cancel</Button>
        </Form>
      </Card.Body>
    </Card>
    <Card>
      <Card.Title>Delete Profile</Card.Title>
      <Button onClick={()=>deleteUser(username)} variant="danger">Delete</Button>
    </Card>
    </>
  );
};