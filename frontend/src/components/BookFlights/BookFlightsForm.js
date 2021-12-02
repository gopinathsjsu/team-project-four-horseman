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
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "90vh",
              paddingTop: "100px",
              background: "#e8effa",
            }}
          >
            <div
              className="book-flights-form"
              style={{ fontSize: "2rem", color: "purple", textAlign: "center" }}
            >
              Where would you like to go?
            </div>
            <form action="/displayflights" method="get">
              <div
                style={{
                  display: "flex",
                  width: "100vw",
                  justifyContent: "center",
                }}
              >
                <div className="book-flights-form">
                  <span>From</span>
                  {airportList && (
                    <AirportList
                      value={airportList}
                      title="departure-airport"
                    />
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
                <div className="date-form">
                  <button className="search-flights-button">
                    Search Flights
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </>
  );
};

export default BookFlightsForm;
