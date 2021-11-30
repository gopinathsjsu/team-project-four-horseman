import React from "react";
import { Link } from "react-router-dom";
import PaymentInformation from "./PaymentInformation";
const SeatSelection = ({ details, passengers }) => {
  function paymentInfo() {
    document.getElementById("seat-cancel-button").style.visibility = "hidden";
    document.getElementById("payment-info").style.display = "block";
  }
  return (
    <div>
      <div class="seat-map">
        <div class="seat-map-row"></div>
        kjhgfd
        <h1>{passengers}</h1>
      </div>
      <Link to="/displayflights">
        <button id="seat-cancel-button" style={{ marginLeft: "20%" }}>
          Cancel search
        </button>
      </Link>
      <button style={{ marginLeft: "1%" }} onClick={paymentInfo}>
        Proceed to Payment
      </button>
      <div id="payment-info" style={{ marginTop: "10%", display: "none" }}>
        {passengers && (
          <PaymentInformation details={details} passengers={passengers} />
        )}
      </div>
    </div>
  );
};

export default SeatSelection;
