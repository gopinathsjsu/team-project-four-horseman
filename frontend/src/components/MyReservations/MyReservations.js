import React, { useState, useEffect } from "react";
import ReservationDetails from "./ReservationDetails";
import axios from "axios";

const MyReservations = () => {
  const [reservations, setReservations] = useState(null);
  async function cancelBooking(){
    const body={
    "userId": "94fd9100-4cb5-11ec-a071-2d0812b5f52b",
    "flight": reservations.flight.id,
    "pnr":reservations.pnr
    
    
    }
    try {
        const response = await axios.post(`http://krishnagupta.live:3000/booking/cancel`, body);
        if (response.data.status) {
            console.log(response.data.status)
          return response.data.data;
        } else {
          console.log(response.data.message);
          return;
        }
      } catch (error) {
        return {
          status: 500,
          message: error.toString(),
        };
      }
    
    
    }
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
      {reservations && <ReservationDetails reservations={reservations}/>}

      <div className="manage-reservations">
        <button style={{ marginLeft: "35%" }} onClick={cancelBooking}>Cancel booking</button>
      </div>
    </div>
  );
};

export default MyReservations;
