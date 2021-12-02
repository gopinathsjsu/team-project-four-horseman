import React, { useEffect, useState } from "react";
import { Col, Container, Spinner, Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SeatPicker from "react-seat-picker";

const SeatSelection = () => {
  // function paymentInfo() {
  //   document.getElementById("seat-cancel-button").style.visibility = "hidden";
  //   document.getElementById("payment-info").style.display = "block";
  // }

  const [details, setDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const [travellers, setPassengers] = useState();
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
    const details = localStorage.getItem("details");
    const userDetails = localStorage.getItem("user");
    const travellers = localStorage.getItem("passengers");
    console.log(travellers);

    const parsedDetails = JSON.parse(details);

    if (userDetails != null && userDetails != undefined) {
      setUserDetails(JSON.parse(userDetails));
      setPassengers(JSON.parse(travellers));
      setDetails(JSON.parse(details));
    }
    if (parsedDetails?.seats) {
      let rowNum = 1;
      let temp = [];
      console.log(parsedDetails.seats.seatMap);
      for (let seat of Object.keys(parsedDetails.seats.seatMap)) {
        temp.push({
          id: seat,
          number: seat,
          tooltip: `$ ${parsedDetails.price}`,
          isSelected: false,
          isReserved: parsedDetails.seats.seatMap[seat].userId !== "",
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
  }, []);

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
      userId: userDetails.id,
      flight: details.id,
      milesUsed: miles,
      seats: seatInformation,
    };
    console.log(body);
    if (seatsSelected.length == travellers.length) {
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
        <div
          style={{
            margin: "0px",
            padding: "0px",
            width: "100vw",
          }}
        >
          <Row>
            <Col xs={4}>
              <Container
                style={{ width: "100%", marginLeft: "2rem", marginTop: "5rem" }}
              >
                <h2>Your entered traveller information:</h2>
                <br />
                {travellers.map((passenger) => (
                  <div key={passenger.firstName}>
                    Passenger {travellersTracker.push(passenger.firstName)}:
                    <b> {passenger.firstName}</b>
                    <br />
                    <br />
                  </div>
                ))}
                <br />
                <h3>Enter payment information:</h3>
                <br />
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
                  <br />

                  <div class="slidecontainer">
                    <input
                      type="range"
                      min="0"
                      max={userDetails ? userDetails.miles : 100}
                      step="1"
                      defaultValue={miles}
                      onChange={setMilesInput}
                    />
                    <p>
                      Total Miles available are:{" "}
                      <span id="demo">{userDetails?.miles}</span>
                    </p>
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
            <Col xs={4}>
              <p>jhsadbhjsda</p>
            </Col>
            <Col xs={4}>
              <Container style={{ marginTop: "5%" }}>
                <div style={{ overflowY: "scroll", height: "30rem" }}>
                  <SeatPicker
                    addSeatCallback={addSeatCallback}
                    removeSeatCallback={removeSeatCallback}
                    rows={rows}
                    maxReservableSeats={travellers.length}
                    visible
                    selectedByDefault
                  />
                </div>
              </Container>
            </Col>
          </Row>
        </div>
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
