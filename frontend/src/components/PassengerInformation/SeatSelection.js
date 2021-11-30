import React, { useEffect, useState } from "react";
import { Col, Container, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaymentInformation from "./PaymentInformation";
import SeatPicker from "react-seat-picker";
const SeatSelection = ({ details, passengers }) => {
  const SeatSelection = ({ details, passengers }) => {
    // function paymentInfo() {
    //   document.getElementById("seat-cancel-button").style.visibility = "hidden";
    //   document.getElementById("payment-info").style.display = "block";
    // }
    const [showSeatSelection, setShowSeatSelection] = useState(false);
    const [rows, setRows] = useState([]);
    const [seatsSelected, setSeatsSelected] = useState([]);

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
              <Container>
                {passengers.toString()}
                <Button
                  variant="secondary"
                  style={{ alignSelf: "center" }}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(seatsSelected);
                  }}
                >
                  Confirm Booking
                </Button>
              </Container>
            </Col>
            <Col>
              <Container style={{ width: "70vw", marginLeft: "5vw" }}>
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

      // </div>
    );
  };
};
export default SeatSelection;
