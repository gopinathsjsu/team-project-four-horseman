import React, { useEffect, useState } from "react";
import { Col, Container, Spinner, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SeatPicker from "react-seat-picker";

const SeatSelection = ({ details, passengers }) => {
  // function paymentInfo() {
  //   document.getElementById("seat-cancel-button").style.visibility = "hidden";
  //   document.getElementById("payment-info").style.display = "block";
  // }
  const travellers = JSON.parse(passengers);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [rows, setRows] = useState([]);
  const [seatsSelected, setSeatsSelected] = useState([]);
  const [miles, setMiles] = useState(50);
  const travellersTracker = [];
  const history = useHistory();

  const addSeatCallback = ({ row, number, id }, addCb) => {
    console.log(`Added seat ${number}, row ${row}, id ${id}`);
    const newTooltip = `tooltip for id-${id} added by callback`;
    addCb(row, number, id, newTooltip);
    let temp = seatsSelected;
    temp.push(id);
    setSeatsSelected(temp);
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    // A value of null will reset the tooltip to the original while '' will hide the tooltip
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    removeCb(row, number, newTooltip);
    let temp = seatsSelected;
    temp.splice(temp.indexOf(id), 1);
    setSeatsSelected(temp);
  };
  useEffect(() => {
    if (details?.seats) {
      let rowNum = 1;
      let temp = [];
      for (let seat of Object.keys(details.seats.seatMap)) {
        temp.push({
          id: seat,
          number: seat,
          tooltip: `$ ${details.price}`,
          isSelected: false,
          isReserved: details.seats.seatMap[seat].userId !== "",
        });
        if (rowNum % 2 === 0 && rowNum % 6 !== 0) {
          temp.push(null);
        }
        if (rowNum % 6 === 0) {
          let prevRows = rows;
          prevRows.push(temp);
          setRows(prevRows);
          temp = [];
        }
        rowNum++;
      }
    }
    console.log(JSON.stringify(rows));
    setShowSeatSelection(true);
  }, [details, rows]);

  const setMilesInput = (e) => {
    console.log(e.target.value);
    setMiles(e.target.value);
    console.log(miles);
  };
  async function createBooking() {
    const seatInformation = [];
    for (let i = 0; i < seatsSelected.length; i++) {
      seatInformation.push({
        seatNo: seatsSelected[i],
        passengerName: travellersTracker[i],
      });
    }
    console.log(travellersTracker);

    console.log(seatInformation);
    const body = {
      userId: "94fd9100-4cb5-11ec-a071-2d0812b5f52b",
      flight: details.id,
      milesUsed: miles,
      seats: seatInformation,
    };
    console.log(body);
    if (seatsSelected.length == JSON.parse(passengers).length) {
      try {
        const response = await axios.post(
          `http://krishnagupta.live:5000/booking/create`,
          body
        );
        console.log(response);
        if (response.status) {
          console.log(response.status);
          history.push(`/booking?pnr=${response.data.pnr}`);
          return response.data.data;
        } else {
          console.log(response.data.message);
          return;
        }
      } catch (error) {
        return {
          status: 500,
          message: error.toString(),
        };
      }
    } else {
      alert("Please choose the correct number of seats");
    }
  }

  return (
    <>
      {showSeatSelection ? (
        <Container
          fluid
          style={{
            width: "85vw",
            margin: 0,
            padding: 0,
            display: "flex",
          }}
        >
          <Col xs={3}>
            <Container style={{ width: "30vw" }}>
              <h2>Your entered traveller information:</h2>
              {travellers.map((passenger) => (
                <div key={passenger.firstName}>
                  Passenger {travellersTracker.push(passenger.firstName)}:
                  <b> {passenger.firstName}</b>
                  <br />
                  <br />
                </div>
              ))}
              <br />
              <h2>Enter payment information:</h2>
              <div className="book-flights-form">
                <input
                  type="tel"
                  pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                  maxLength="14"
                  placeholder="Enter your card number"
                  required
                ></input>
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                ></input>
                <br />

                <div class="slidecontainer">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    defaultValue={miles}
                    onChange={setMilesInput}
                  />

                  <p>
                    Miles to be used: <span id="demo">{miles}</span>
                  </p>
                </div>
                <div></div>
              </div>

              <Button
                variant="secondary"
                style={{ alignSelf: "center" }}
                onClick={(e) => {
                  e.preventDefault();
                  createBooking();
                }}
              >
                Confirm Booking
              </Button>
            </Container>
          </Col>
          <Col>
            <Container style={{ width: "70vw", marginLeft: "20vw" }}>
              <SeatPicker
                addSeatCallback={addSeatCallback}
                removeSeatCallback={removeSeatCallback}
                rows={rows}
                maxReservableSeats={JSON.parse(passengers).length}
                visible
                selectedByDefault
              />
            </Container>
          </Col>
        </Container>
      ) : (
        <Spinner
          style={{ marginLeft: "45%" }}
          animation="border"
          variant="success"
        />
      )}
    </>
    //</div>
  );
};

export default SeatSelection;
