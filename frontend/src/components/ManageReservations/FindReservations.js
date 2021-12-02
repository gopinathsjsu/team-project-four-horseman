import React from "react";

const FindReservations = () => {
  return (
    <div class="input-bar">
      <div class="input-bar-item width100">
        <form action="/booking">
          <div class="form-group">
            <input
              class="form-control width100"
              type="text"
              placeholder="Ticket Number or Reservation Code(PNR)"
              name="pnr"
            ></input>
            <input
              class="form-control width100-2"
              type="text"
              name="name"
              placeholder="Passenger LastName"
            ></input>
          </div>
          <div class="input-bar-item">
            <input type="submit" class="btn btn-info"></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindReservations;
