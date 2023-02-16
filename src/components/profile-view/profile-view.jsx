import React from "react";
import { useState } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import format from "date-fns/format";
// import { UserInfo } from "./user-info";

//pass props {movies, users} from MainView
export const ProfileView = ({ movies, user }) => {
  //const [user, setUser] = useState([]);
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

//  const formatBirthday = (new Date({user.Birthday}));

  // const [username, setUsername] = useState(user.Username);
  // const [password, setPassword] = useState(user.Password);
  // const [email, setEmail] = useState(user.Email);
  // const [birthday, setBirthday] = useState(user.Birthday);

//const favList = user.FavoriteMovies ?? [];
const favMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id)); //or _id?
        return(
          <>
          <Card>
            <Card.Title>Your Profile</Card.Title>
            <Card.Body>Your data</Card.Body>
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {format(new Date(user.Birthday),'MMM dd, yyyy')}</Card.Text>
            {/* make button functional */}
            {/* create form to update user information - put it on a new page? */}
            <Button variant="light">Update</Button>
          </Card>
          </>
        );
      };