import React, { useState, useEffect } from "react";
import FlightDetails from "./FlightDetails";
import axios from "axios";

const MyReservations = () => {
  const [reservations, setReservations] = useState(null);
  


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const pnr = queryParams.get("pnr");
    const params = pnr;

    console.log(params);
    axios
      .get(`http://krishnagupta.live:3000/booking/${params}`)
      .then((response) => {
        console.log(response.data);
        setReservations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {reservations && <FlightDetails reservations={reservations}/>}

      <div className="manage-reservations">
        <button style={{ marginLeft: "25%" }}>Cancel booking</button>
        <button style={{ marginLeft: "2%" }}>Change booking</button>
      </div>
    </div>
  );
};

export default MyReservations;
