import { React } from "react"
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
// import { UserInfo } from "./user-info";

export const ProfileView = () => {
  const [user, setUser] = useState([]);
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  // console.log(storedUser, " This is the token:" + storedToken);

  useEffect(() => {
      fetch("https://90s-movie-api-liart.vercel.app/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => response.json())
      .then((data) => {
      console.log("all users", data);
        const userFromAPI = data.map((user) => {
          return {
            // _id: username.key,
            Username: user.Username,
            Password: user.Password
          };
        });
        setUser(userFromAPI);
        console.log("hello" + storedUser + " TOKEN: " + storedToken );
      });
  }, []);

      if(user.Username === storedUser.Username) {
        return(
          <Card>
            <Card.Title>Your Profile</Card.Title>
            <Card.Body>Your data</Card.Body>
            {/* make button funtional */}
            <Button variant="light">Update</Button>
          </Card>
        );
      }
}