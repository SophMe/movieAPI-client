import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

export const UpdateUser = ({ user, data }) => {
  const [username, setUsername] = useState(user.Username);    // set useState to current data, not empty as in Signup
  const [email, setEmail] = useState(user.Email);             // const [password, setPassword] = useState(""); updated one would have to be hashed, change needed in backend
  const [birthday, setBirthday] = useState(user.Birthday);
  const token = localStorage.getItem("token");

  //const navigate = useNavigate();

  const handleSubmit = (event) => {event.preventDefault();
  const data = { Username: username, Password: user.Password, Email: email, Birthday : birthday };

  //fetch(`https://90smovies.vercel.app/users/${user.Username}`, {
  fetch(`https://nine0smovieapi-oyws.onrender.com/users/${user.Username}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.ok) {
      localStorage.clear(); 
      window.location.reload();
      // navigate("/");
    } else {
      alert("Update failed");
    }
  });
};

const deleteUser = () => {
  //fetch(`https://90smovies.vercel.app/users/${user.Username}`, {
  fetch(`https://nine0smovieapi-oyws.onrender.com/users/${user.Username}`, {
  method: "DELETE",
  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
  body: JSON.stringify(data)
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    localStorage.clear();
    alert("User deleted");
    window.location.reload();
    // navigate("/");
    }).catch((e) => {
      console.log(e);
    });
  };

  return (
    <>
    <Card>
      <Card.Title className="text-center title">Update Profile</Card.Title>
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
          <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group>
          <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          
          <Button onClick={handleSubmit} variant="light" type="submit" size="sm">Update</Button>
        </Form>
      </Card.Body>
    </Card>
    <Card>
      <Card.Title className="text-center title">Delete Profile</Card.Title>
      <Card.Body className="d-flex justify-content-center">
      <Button onClick={deleteUser} variant="danger" size="sm">Delete</Button>
      </Card.Body>
    </Card>
    </>
  );
};