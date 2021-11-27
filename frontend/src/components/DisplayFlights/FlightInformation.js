import React from "react";

const DisplayFlights = ({ re }) => {
  function onclick(){
    console.log('hi')

  }
  return (
    <div className="flight-display-holder" style={{marginTop:"5%"}}>
      <div className="flight-details-single" onClick={onclick}>
        <div className="flight-details-departing-airport">
          <span>06.15</span>
          <br />

          <span>SJC</span>
          <br />
          <span>San Jose</span>
          <br />
        </div>
        <div className="flight-details-connecting-line" style={{marginTop:'1rem'}}>
          <small>────────────────────────────────</small>
        </div>
        <div className="flight-details-arrival-airport">
          <span>07.15</span>
          <br />

          <span>SJC</span>
          <br />
          <span>San Jose</span>
          <br />
        </div>
        

        {/* <div className="flight-details-time-duration">
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
  </div>*/}
    </div> 
    </div>
  );
};

export default DisplayFlights;
