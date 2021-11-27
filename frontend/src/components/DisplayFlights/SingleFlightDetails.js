import React from 'react'

const SingleFlightDetails = () => {
    return (
        <div className='single-flight-details'>
        <p style={{ fontSize: "2rem" }}>Travel Information</p>
      <p style={{ fontSize: "1.5rem", color: "purple" }}>
        Flights to be checked
      </p>
      <div className="flight-details">
        <div
          style={{
            backgroundColor: "purple",
            width: "10%",
            textAlign: "center",
            color: "white",
            height: "1.5rem",
          }}
        >
          Flight 
        </div>
        <p style={{ fontSize: "1.5rem" }}>
          {}
          {/* {reservations["flight"].fromAirportCode} - {reservations["flight"].toAirportCode} on {depDate} */}
        </p>
        <table>
          <tr>
            <th style={{ width: "20%" }}>FLIGHT</th>
            <th>FROM</th>
            <th>TO</th>
            <th>PRICE</th>
          </tr>
          <tr>
            <td>
              {/* <b>{reservations['flight'].flightCode}</b> */}

              
            </td>
            <td>
              {/* <b>{depTime}</b>
              <h4> {reservations["flight"].fromAirportCity} ({reservations["flight"].fromAirportCode})</h4>
              <small>{reservations["flight"].fromAirportName}</small> */}
            </td>
            <td>
              {/* <b>{arrTime}</b>
              <h4>{reservations["flight"].toAirportCity} ({reservations["flight"].toAirportCode})</h4>
              <small>{reservations["flight"].toAirportName}</small> */}
            </td>

            <td>
              {/* <h3>{reservations["flight"].price} $</h3> */}
            </td>
          </tr>
        </table>
        </div>
        </div>
    )
}

export default SingleFlightDetails
