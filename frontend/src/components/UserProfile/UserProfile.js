import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { get } from "../../utils/Api";
import { Redirect, useHistory } from "react-router";
import { Accordion, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Button from "@restart/ui/esm/Button";

const UserProfile = (props) => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  const [userDetails, setUserDetails] = useState();
  const [userBookings, setUserBookings] = useState();
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    // console.log("CHECK : ", props);
    const user = localStorage.getItem("user");
    console.log(user);
    if (user !== null && user !== undefined) {
      setUserDetails(JSON.parse(user));
    } else {
      history.replace("/login");
    }

    fetch(`http://krishnagupta.live:5000/booking/user/${JSON.parse(user).id}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data));
        setUserBookings(data);
        localStorage.setItem("userBookings", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {userDetails && userBookings ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="userprofile-card">
            <br />
            <h1 class="userprofile-title">Welcome onboard, Happy flying!</h1>
            <p className="user">
              Name: {userDetails.firstName} {userDetails.lastName}
              <br />
              Address: {userDetails.address}
              <br />
              Home City: {userDetails.city}
              <br />
              State: {userDetails.state}
              <br />
              Zip Code: {userDetails.zip}
              <br />
              Country: Email: {userDetails.country}
              <br />
              Miles Balance: {userDetails.miles}
            </p>
          </div>
          {/* <div className="userprofile-card">
            <button onClick={BookFlights}>Book your next journey</button>
            <button onClick={BookFlights}>Check Existing Bookings</button>
          </div> */}
          <div class="user-bookings-card">
            <Accordion>
              <h3>Scheduled Trips</h3>
              {userBookings.map((item, index) => {
                return (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>PNR : {item.pnr}</Accordion.Header>
                    <Accordion.Body>
                      Paid : ${item.totalCost}, Miles Used: {item.milesUsed},
                      Booked on: {item.createdAt}
                      <br />
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/booking/?pnr=${item.pnr}`);
                        }}
                      >
                        Details
                      </Button>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>
        </div>
      ) : (
        <Spinner variant="success" animation="border" />
      )}
    </>
  );
};
export default UserProfile;
