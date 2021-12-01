import React, { useState, useEffect } from "react";
import FlightInformation from "./FlightInformation";
import { useHistory } from "react-router";
import { Spinner } from "react-bootstrap";

const DisplayFlights = () => {
  const [flights, setFlights] = useState();
  console.log(flights ? flights[0] : flights);
  const history = useHistory();
  const [isPending, setisPending] = useState(false);

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
        if (res.status == 404) {
          alert("Flights not found.Please enter a different route");
          history.replace("/");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setFlights(data.flights);
        setisPending(true);
        // console.log(flights)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {isPending ? (
        <div>
          <div style={{ marginLeft: "2rem", marginTop: "3%" }}>
            {flights && (
              <h1>
                Showing flights from {flights[0]?.fromAirportCity} to{" "}
                {flights[0]?.toAirportCity}
              </h1>
            )}
          </div>
          <div style={{ height: "20rem" }}>
            {flights && <FlightInformation flights={flights} />}
          </div>
        </div>
      ) : (
        <Spinner
          style={{ marginLeft: "45%" }}
          animation="border"
          variant="success"
        />
      )}
    </>
  );
};

export default DisplayFlights;
