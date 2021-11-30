import React, { useState, useEffect } from "react";
import FlightInformation from "./FlightInformation";

const DisplayFlights = () => {
  const [flights, setFlights] = useState();
  console.log(flights ? flights[0] : flights);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const date = queryParams.get("trip-start");
    const depAirport = queryParams.get("departure-airport");
    const arrAirport = queryParams.get("arrival-airport");
    console.log(date, depAirport, arrAirport); // 55 test null
    let params = {
      from: depAirport,
      to: arrAirport,
      deptTime: date,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    let url = "http://krishnagupta.live:5000/flights?" + query;

    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFlights(data.flights);
        // console.log(flights)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div style={{ marginLeft: "2rem" }}>
        {flights && (
          <h1>
            Showing flights from {flights[0]?.fromAirportCity} to{" "}
            {flights[0]?.toAirportCity}
          </h1>
        )}
      </div>

      {flights && <FlightInformation flights={flights} />}
    </div>
  );
};

export default DisplayFlights;
