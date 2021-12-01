import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { get } from "../../utils/Api";
import { Redirect, useHistory } from "react-router";

const UserProfile = (props) => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  const [userDetails, setUserDetails] = useState();

  const history = useHistory();

  console.log(props);
  const userData = props.history.location.state;

  useEffect(() => {
    // console.log("CHECK : ", props);
    const user = localStorage.getItem("user");
    if (user !== null && user !== undefined) {
      setUserDetails(JSON.parse(user));
    } else {
      history.replace("/login");
    }
  }, []);

  const BookFlights = () => {
    <Redirect to="/" />;
  };

  return (
    <>
      {userData ? (
        <div>
          <div className="userprofile-card">
            <br />
            <h1 class="userprofile-title">Welcome onboard, Happy flying!</h1>
            <p className="user">
              Name: {userData.firstName} {userData.lastName}
              <br />
              Address: {userData.address}
              <br />
              Home City: {userData.city}
              <br />
              State: {userData.state}
              <br />
              Zip Code: {userData.zip}
              <br />
              Country: Email: {userData.country}
              <br />
              Miles Balance: {userData.miles}
            </p>
          </div>
          <div className="userprofile-card">
            <button onClick={BookFlights}>Book your next journey</button>
            <button onClick={BookFlights}>Check Existing Bookings</button>
          </div>
          <div className="userprofile-card"></div>
        </div>
      ) : null}
    </>
  );
};
export default UserProfile;
