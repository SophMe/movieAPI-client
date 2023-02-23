import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

export const UpdateUser = ({user}) => {
  // set useState to current data, not empty as in Signup
  const [username, setUsername] = useState(user.Username);
  // const [password, setPassword] = useState(""); updated one would have to be hashed, change needed in backend
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const token = localStorage.getItem("token");

  console.log(user.Username);

  const handleSubmit = (event) => {event.preventDefault();
  const data = { Username: username, Password: user.Password, Email: email, Birthday : birthday };

  fetch(`https://90s-movie-api-sophme.vercel.app/users/${user.Username}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.ok) {
      alert("Update successful");
      window.location.reload();
    } else {
      alert("Update failed");
    }
  });
};

// const deleteUser = ({user}) => {
//   fetch(`https://90s-movie-api-sophme.vercel.app/users${user.Username}`, {
//   method: "DELETE",
// })
// .then((result)=>{
//   result.json().then((resp)=>{
//     console.warn(resp)
//   })
// })
// };

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

          {/* <Form.Group>
          <Form.Label>New password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group> */}
            
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
          
          <Button onClick={handleSubmit} variant="light" type="submit">Update</Button>
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