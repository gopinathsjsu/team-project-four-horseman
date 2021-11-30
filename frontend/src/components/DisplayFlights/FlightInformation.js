import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DisplayFlights = ({ flights }) => {
  const [depDate, setDepDate] = useState();
  const [depTime, setDepTime] = useState();
  const [arrDate, setArrDate] = useState();
  const [arrTime, setArrTime] = useState([]);
  function timeparser() {
    var dep = flights[0]?.deptTime;
    var arr = flights[0]?.arrTime;
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

  useEffect(() => {
    timeparser();
  }, []);

  return (
    <div className="flight-display-holder" style={{ marginTop: "5%" }}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/displayflights/${flights[0]?.id}`}
      >
        <div className="flight-details-single">
          <div className="flight-details-departing-airport">
            <span>{depTime}</span>
            <br />

            <span>{flights[0]?.fromAirportCode}</span>
            <br />
            <span>{flights[0]?.fromAirportCity}</span>
            <br />
          </div>
          <div
            className="flight-details-connecting-line"
            style={{ marginTop: "1rem" }}
          >
            <small>────────────────────────────────</small>
          </div>
          <div className="flight-details-arrival-airport">
            <span>{arrTime}</span>
            <br />

            <span>{flights[0]?.toAirportCode}</span>
            <br />
            <span>{flights[0]?.toAirportCity}</span>
            <br />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DisplayFlights;
