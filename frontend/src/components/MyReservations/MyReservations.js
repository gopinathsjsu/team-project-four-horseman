import React, { useState, useEffect } from "react";
import ReservationDetails from "./ReservationDetails";
import axios from "axios";
import { useHistory } from "react-router";

const MyReservations = () => {
  const [reservations, setReservations] = useState(null);
  const history = useHistory();
  async function cancelBooking() {
    const body = {
      userId: "94fd9100-4cb5-11ec-a071-2d0812b5f52b",
      flight: reservations.flight.id,
      pnr: reservations.pnr,
    };
    console.log(body);
    try {
      const response = await axios.post(
        `http://krishnagupta.live:5000/booking/cancel`,
        body
      );
      if (response.status) {
        console.log(response.data);
        history.push("/userprofile");
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
      .get(`http://krishnagupta.live:5000/booking/${params}`)
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
      {reservations && <ReservationDetails reservations={reservations} />}

      <div className="manage-reservations">
        <button
          style={{ marginLeft: "40%", marginTop: "5%" }}
          onClick={cancelBooking}
        >
          Cancel booking
        </button>
      </div>
    </div>
  );
};

export default MyReservations;
