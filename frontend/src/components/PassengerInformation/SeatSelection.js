import React from "react";
import PaymentInformation from "./PaymentInformation";
const SeatSelection = ({ details,passengers }) => {

    function paymentInfo(){
        document.getElementById('payment-info').style.display='block'
    }
  return (
    <div>
      <div class="seat-map">
        {/* {Object.keys(seatMap).map(()=>{
              <div>{seatMap[]}</div> */}
        <div class="seat-map-row"></div>
        kjhgfd
        {console.log(passengers)}
        <h1>{passengers}</h1>
      </div>
      <button style={{ marginLeft: "30%" }} onClick={paymentInfo}>
          Proceed to Payment
        </button>
      <div id='payment-info' style={{ marginTop: "10%", display: "none" }}>
        <PaymentInformation details={details} />
      </div>
    </div>
  );
};

export default SeatSelection;
