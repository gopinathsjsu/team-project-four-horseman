import React, { useEffect, useState } from "react";
import AirportList from "./AirportList";
import { Spinner } from "react-bootstrap";
const BookFlightsForm = () => {
  const [airportList, setairportList] = useState();
  const [isPending, setisPending] = useState(false);
  useEffect(() => {
    fetch("http://krishnagupta.live:5000/airports")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setairportList(data);
        setisPending(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isPending ? (
        <div className="book-flights">
          <p style={{ fontSize: "3rem" }}>Book Flights</p>
          <form action="/displayflights" method="get">
            <div
              className="book-flights-form"
              style={{ fontSize: "2rem", color: "purple" }}
            >
              Where would you like to go?
            </div>
            <div className="book-flights-form">
              <span>From</span>
              {airportList && (
                <AirportList value={airportList} title="departure-airport" />
              )}
            </div>
            <br />
            <div className="book-flights-form">
              <span>To</span>
              <br />
              {airportList && (
                <AirportList value={airportList} title="arrival-airport" />
              )}
            </div>
            <div className="date-form">
              <label htmlFor="trip-start">Departure</label>
              <br />
              <input
                type="date"
                id="trip-start"
                name="trip-start"
                required
              ></input>
            </div>

            <button
              className="search-flights-button"
              style={{ marginRight: "50rem" }}
            >
              Search Flights
            </button>
          </form>
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

export default BookFlightsForm;
