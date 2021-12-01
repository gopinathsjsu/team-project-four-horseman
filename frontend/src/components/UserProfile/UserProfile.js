import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { get } from "../../utils/Api";

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

  const [data, setData] = useState();

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

  return (
    <>
      {userData ? (
        <div className="userprofile">
          <br />
          <h1 class="display-1">Welcome onboard, Happy flying!</h1>
          <p>
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
            Country: Email: {userData.email}
            <br />
            Miles Balance: {userData.miles}
          </p>

          <input
            onClick={(e) => getUserDetails(e)}
            type="submit"
            className="signin-submit-button"
          ></input>
          <br />
          <br />
          <br />
        </div>
      ) : null}
    </>
  );
};
export default UserProfile;
