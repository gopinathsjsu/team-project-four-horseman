import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { get } from "../../utils/Api";

const UserProfile = (props) => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(props);
  }, []);

  const [data, setData] = useState();

  const getUserDetails = async (e) => {
    e.preventDefault();
    const response = await get({
      endpoint: "user/profile/94fd9100-4cb5-11ec-a071-2d0812b5f52b",
      body: values,
    });
    setData(response.data);

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
      {data ? (
        <div className="userprofile">
          <br />
          <h1 class="display-1">Welcome onboard, Happy flying!</h1>
          <p>
            Name: {data.user.firstName} {data.user.lastName}
            <br />
            Address: {data.user.address}
            <br />
            Home City: {data.user.city}
            <br />
            State: {data.user.state}
            <br />
            Zip Code: {data.user.zip}
            <br />
            Country: Email: {data.user.email}
            <br />
            Miles Balance: {data.user.miles}
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
