import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { get } from "../../utils/Api";
import { Redirect } from "react-router";

const UserProfile = (props) => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  console.log(props);
  const userData = props.history.location.state;

  useEffect(() => {
    // console.log("CHECK : ", props);
  }, []);

  const getUserDetails = async (e) => {
    e.preventDefault();
    const response = await get({
      endpoint: "user/profile/94fd9100-4cb5-11ec-a071-2d0812b5f52b",
      body: values,
    });

    console.log(response.data);
    /* if (response.status == 200 || response.status == 201) {
      // TODO: Diplay User details
      console.log("Success: " + response);
    } else {
      console.log(response);
    } */
  };

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
        </div>
      ) : null}
    </>
  );
};
export default UserProfile;
