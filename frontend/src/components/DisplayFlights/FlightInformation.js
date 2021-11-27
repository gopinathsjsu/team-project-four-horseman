import React from "react";

const DisplayFlights = ({ re }) => {
  return (
    <div className="flight-display-holder">
      <div className="flight-details-single">
        <div className="flight-details-departing-airport">
          <span>06.15</span>
          <br />

          <span>SJC</span>
          <br />
          <span>San Jose</span>
          <br />
        </div>
        <div className="flight-details-connecting-line">
          <small>────────────────────────────────</small>
        </div>
        <div className="flight-details-arrival-airport">
          <span>06.15</span>
          <br />

          <span>SJC</span>
          <br />
          <span>San Jose</span>
          <br />
        </div>

        <div className="flight-details-time-duration">
          <span>Flight Duration</span>
          <br />
          <br />
          <span>19hr 55m</span>
        </div>

        <div className="flight-details-itinerary-details">
          <p> Itinerary details</p>
          <span style={{ marginLeft: "10%" }}>---</span>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default DisplayFlights;
