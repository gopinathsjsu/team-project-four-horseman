import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const PaymentInformation = ({ details, passengers }) => {
  const passengerDetails = JSON.parse(passengers);
  console.log(passengerDetails);
  console.log(details);
  async function createBooking() {
    const body = {
      userId: "94fd9100-4cb5-11ec-a071-2d0812b5f52b",
      flight: details.id,
      milesUsed: 50,
      seats: [
        {
          seatNo: "25C",
          passengerName: passengers,
        },
        {
          seatNo: "1C",
          passengerName: "Krishna",
        },
      ],
    };
    try {
      const response = await axios.post(
        `http://krishnagupta.live:5000/booking/create`,
        body
      );
      if (response.data.status) {
        console.log(response.data.status);
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
  return (
    <div>
      <h1> Your travel information</h1>
      {passengerDetails.map((item) => (
        <p>{passengerDetails[item]}</p>
      ))}
      {passengerDetails[0].firstName}
      <div className="book-flights-form">
        <input
          type="tel"
          pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
          maxLength="14"
          placeholder="Enter your card number"
          required
        ></input>
        <br />
        <br />
        <input type="text" placeholder="Enter your name" required></input>
        <br />

        <div class="slidecontainer">
          <input type="range" min="0" max="10" step="2" value="6" />

          <p>
            Value: <span id="demo"></span>
          </p>
        </div>
        <div>
          <Link to="/displayflights">
            <button id="payment-cancel-button" style={{ marginLeft: "20%" }}>
              Cancel search
            </button>
          </Link>
          <button
            type="submit"
            style={{ marginLeft: "2%" }}
            onClick={createBooking}
          >
            Confirm booking{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
