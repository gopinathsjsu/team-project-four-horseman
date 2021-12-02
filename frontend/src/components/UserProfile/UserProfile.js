import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { Redirect, useHistory } from "react-router";
import { Accordion, Col, Row, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Button from "@restart/ui/esm/Button";

const UserProfile = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [userBookings, setUserBookings] = useState();
  const history = useHistory();
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User: ", user);
    if (user !== null && user !== undefined) {
      setUserDetails(JSON.parse(user));
    } else {
      history.go(-1);
    }

    fetch(`http://krishnagupta.live:5000/booking/user/${JSON.parse(user).id}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        setUserBookings(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {userDetails ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3 style={{ margin: "20px" }}>
              Welcome Onboard,{" "}
              <em>
                {userDetails.firstName} {userDetails.lastName}
              </em>
              . Happy flying!
            </h3>
          </div>
          {/* <hr style={{ margin: "0px" }} /> */}
          <Row
            style={{
              display: "flex",
              width: "100vw",
              margin: "0px",
              paddingTop: "10px",
              overflowX: "hidden",
              backgroundColor: "#f1f1f1",
            }}
          >
            <Col
              style={{
                margin: "10px",
              }}
            >
              <Row className="miles-card" style={{ padding: "45px" }}>
                <h4>FH Miles Member</h4>
                <div style={{ paddingTop: "45px" }}>
                  <h4>
                    <em>{userDetails.miles}</em>
                    <p>status miles</p>
                  </h4>
                </div>
                <div>
                  <p>
                    {`You still require ${
                      40000 - userDetails.miles
                    } status miles or 28 flight segments for qualification as a Frequent Traveller.`}
                  </p>
                </div>
              </Row>
              <Row className="userprofile-card">
                <h4>Profile</h4>
                <h6>Email</h6>
                <p>{userDetails.email}</p>
                <h6>Phone Number</h6>
                <p>{userDetails.phoneNumber}</p>
                <h6>Address</h6>
                <p>{`${userDetails.address}, ${userDetails.city}`}</p>
                <p>{`${userDetails.state}, ${userDetails.country}, ${userDetails.zip}`}</p>
              </Row>
            </Col>
            <Col
              style={{
                marginTop: "10px",
              }}
            >
              <Row className="user-bookings-card">
                <h4>Recent Trips</h4>
                {userBookings === null || userBookings === undefined ? (
                  <div style={{ textAlign: "center", padding: "30px" }}>
                    You have not booked any flights yet.
                  </div>
                ) : (
                  <>
                    <Accordion>
                      {userBookings.map((item, index) => {
                        return (
                          <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>
                              PNR : {item.pnr}
                            </Accordion.Header>
                            <Accordion.Body>
                              Paid : ${item.totalCost},
                              <br />
                              <div style={{ color: "#fb6219" }}>
                                Miles Used: {item.milesUsed}
                              </div>
                              <div style={{ color: "green" }}>
                                Miles Earned: {item.milesEarned}
                              </div>
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
                  </>
                )}
              </Row>
            </Col>

            {/* {userBookings ? (
              <>
                
              </>
            ) : (
              <div></div>
            )} */}
          </Row>
        </>
      ) : (
        <div
          style={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Spinner
            style={{ marginLeft: "45%" }}
            animation="border"
            variant="success"
          />
        </div>
      )}
    </>
  );
};
export default UserProfile;
