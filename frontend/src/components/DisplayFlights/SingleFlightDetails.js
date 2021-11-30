import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import PassengerDetails from "../PassengerInformation/PassengerDetails";
import SeatSelection from "../PassengerInformation/SeatSelection";

const SingleFlightDetails = () => {
  const [flightDetails, setFlightDetails] = useState();
  const [depDate, setDepDate] = useState();
  const [depTime, setDepTime] = useState();
  const [arrDate, setArrDate] = useState();
  const [arrTime, setArrTime] = useState([]);

  function timeparser() {
    var dep = flightDetails.deptTime;
    var arr = flightDetails.arrTime;
    console.log(dep);

    var options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    var depDateFormat = new Date(dep).toLocaleDateString("en-US", options);
    var depTimeFormat = new Date(dep).toLocaleTimeString();
    var arrDateFormat = new Date(arr).toLocaleDateString("en-US", options);
    var arrTimeFormat = new Date(arr).toLocaleTimeString();
    setDepDate(depDateFormat);
    setDepTime(depTimeFormat);
    setArrDate(arrDateFormat);
    setArrTime(arrTimeFormat);
  }

  function passengerDetails() {
    document.getElementById("enter-passenger-info").style.display = "block";
    document.getElementById("cancel-search-button").style.visibility = "hidden";
  }

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://krishnagupta.live:5000/flights/details/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFlightDetails(data);
        timeparser();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [arrTime]);

  return (
    <>
      {flightDetails ? (
        <div className="single-flight-details">
          <p style={{ fontSize: "2rem" }}>Travel Information</p>
          <p style={{ fontSize: "1.5rem", color: "purple" }}>
            Flights to be checked
          </p>
          <div className="flight-details">
            <div
              style={{
                backgroundColor: "purple",
                width: "10%",
                textAlign: "center",
                color: "white",
                height: "1.5rem",
              }}
            >
              Flight
            </div>
            <p style={{ fontSize: "1.5rem" }}>
              {}
              {flightDetails.fromAirportCode} - {flightDetails.toAirportCode} on{" "}
              {depDate}
            </p>
            <table>
              <tr>
                <th style={{ width: "20%" }}>FLIGHT</th>
                <th>FROM</th>
                <th>TO</th>
                <th>PRICE</th>
              </tr>
              <tr>
                <td>
                  <b>{flightDetails.flightCode}</b>
                </td>
                <td>
                  <b>{depTime}</b>
                  <h4>
                    {" "}
                    {flightDetails.fromAirportCity} (
                    {flightDetails.fromAirportCode})
                  </h4>
                  <small>{flightDetails.fromAirportName}</small>
                </td>
                <td>
                  <b>{arrTime}</b>
                  <h4>
                    {flightDetails.toAirportCity} ({flightDetails.toAirportCode}
                    )
                  </h4>
                  <small>{flightDetails.toAirportName}</small>
                </td>

                <td>
                  <h3>{flightDetails.price} $</h3>
                </td>
              </tr>
            </table>
          </div>

          <div className="manage-reservations">
            <Link to="/displayflights">
              <button id="cancel-search-button" style={{ marginLeft: "20%" }}>
                Cancel search
              </button>
            </Link>

            <button style={{ marginLeft: "1%" }} onClick={passengerDetails}>
              Proceed to Enter Passenger Information
            </button>
          </div>

          <div
            id="enter-passenger-info"
            style={{ marginTop: "15%", display: "none" }}
          >
            <PassengerDetails details={flightDetails} />
          </div>
        </div>
      ) : (
        <Spinner
          style={{ marginLeft: "45%" }}
          animation="border"
          variant="success"
        />
      )}
    </>
  );
};

export default SingleFlightDetails;
