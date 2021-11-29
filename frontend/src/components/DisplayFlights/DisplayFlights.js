import React, { useState, useEffect } from "react";
import FlightInformation from "./FlightInformation";

const DisplayFlights = () => {
  const [flights, setFlights] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const date = queryParams.get("trip-start");
    const depAirport = queryParams.get("departure-airport");
    const arrAirport = queryParams.get("arrival-airport");
    console.log(date, depAirport, arrAirport); // 55 test null
    let params = {
      from: "4a1b9780-4c11-11ec-bc30-c13971008366",
      to: "4a1c81e0-4c11-11ec-bc30-c13971008366",
      deptTime: "2021-12-04",
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    let url = "http://krishnagupta.live:3000/flights?" + query;

    fetch(url)
      .then((res) => {
       
        console.log(res.data);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFlights(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

 
  return (
    <div>
      <div style={{ marginLeft: "2rem" }}>
        <h1>San Francisco to Istanbul on Thursday,December 2</h1>
      </div>
      <FlightInformation />

      <FlightInformation />
    </div>
  );
};

export default DisplayFlights;
