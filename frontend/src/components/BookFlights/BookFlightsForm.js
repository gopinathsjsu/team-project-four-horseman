import React, { useEffect, useState } from "react";
import AirportList from "./AirportList";
const BookFlightsForm = () => {
  const [airportList, setairportList] = useState();

  useEffect(() => {
    fetch("http://krishnagupta.live:3000/airports")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setairportList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="book-flights">
      <p style={{ fontSize: "3rem" }}>Book Flights</p>
      <form action="/displayflights" method="get">
        <div className="trip-type">
          <input type="radio" name="tripType" value="oneWay" checked></input>{" "}
          One-Way
        </div>
        <div className="book-flights-form">
          <span>From</span>
          <br />
          <br />
          {airportList && (
            <AirportList value={airportList} title="departure-airport" />
          )}
        </div>
        <div className="book-flights-form">
          <span>To</span>
          <br />
          <br />
          {airportList && (
            <AirportList value={airportList} title="arrival-airport" />
          )}
        </div>
        <div className="date-form">
          <label htmlFor="trip-start">Departure</label>
          <br />
          <input type="date" id="trip-start" name="trip-start" required></input>
        </div>

        <div className="book-flights-form">
          <span>Cabin</span>
          <br />
          <br />
          <select name="selectList" className="selectList" required>
              <option value="Economy">Economy</option> {" "}
            <option value="Business">Business</option>
          </select>
        </div>

        <button className="search-flights-button">Search Flights</button>
      </form>
    </div>
  );
};

export default BookFlightsForm;
