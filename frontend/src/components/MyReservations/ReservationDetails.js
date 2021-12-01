import React, { useEffect, useState } from "react";

const FlightDetails = ({ reservations }) => {
  const [depDate, setDepDate] = useState(null);
  const [depTime, setDepTime] = useState(null);
  const [arrDate, setArrDate] = useState(null);
  const [arrTime, setArrTime] = useState(null);

  useEffect(() => {
    var dep = reservations["flight"].deptTime;
    var arr = reservations["flight"].arrTime;

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
  }, []);

  return (
    <div className="booking">
      <p style={{ fontSize: "3rem" }}>Manage your booking</p>
      <div className="reservation-header">
        <p style={{ fontSize: "2rem" }}>
          {reservations["flight"].fromAirportCode} -{" "}
          {reservations["flight"].toAirportCode}
        </p>
        <p style={{ fontSize: "1.2rem", color: "purple" }}>
          Departure {depDate}
        </p>
        <div className="airline-pnr">
          <h1>{reservations["pnr"]}</h1>
          <p>Booking reference</p>
        </div>
      </div>
      <p style={{ fontSize: "2rem", marginTop: "2%" }}>Travel Information</p>
      <p style={{ fontSize: "1.5rem", color: "purple" }}>
        Flights to be checked
      </p>
      <div className="flight-details">
        <p style={{ fontSize: "1.5rem" }}>
          {}
          {reservations["flight"].fromAirportCode} -{" "}
          {reservations["flight"].toAirportCode} on {depDate}
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
              <b>{reservations["flight"].flightCode}</b>
            </td>
            <td>
              <b>{depTime}</b>
              <h4>
                {" "}
                {reservations["flight"].fromAirportCity} (
                {reservations["flight"].fromAirportCode})
              </h4>
              <small>{reservations["flight"].fromAirportName}</small>
            </td>
            <td>
              <b>{arrTime}</b>
              <h4>
                {reservations["flight"].toAirportCity} (
                {reservations["flight"].toAirportCode})
              </h4>
              <small>{reservations["flight"].toAirportName}</small>
            </td>

            <td>
              <h3>{reservations["flight"].price} $</h3>
            </td>
          </tr>
        </table>
      </div>
      <div style={{ marginTop: "5%" }}>
        <table style={{ textAlign: "center" }}>
          <tr>
            <th>Passenger Name</th>
            <th>Seat Information</th>
          </tr>
          {reservations.seats.map((reservation) => (
            <tr style={{ border: "1px solid black" }}>
              {" "}
              <td>{reservation.passengerName}</td>
              <td>{reservation.seatNo}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default FlightDetails;
