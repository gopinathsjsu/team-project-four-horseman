import React from "react";
import useForm from "./useForm";
import { Button } from "react-bootstrap";

const UserProfile = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  return (
    <div className="userprofile">
      <br />
      <h1 class="display-1">
        Welcome onboard <u>User</u>, Happy flying!
      </h1>
      <p>//TODO: User details go here </p>
    </div>
  );
};

export default UserProfile;
