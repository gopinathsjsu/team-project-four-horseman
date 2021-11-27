import React, { useState } from "react";
import NavigationBar from "../RegisterPage/NavigationBar";

const FindReservations = () => {
  
  return (
    <div>
      <NavigationBar />

      <head>
        <meta charset="utf-8" />
        <title>Bootstrap, from Twitter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <link
          data-require="bootstrap-css"
          data-semver="3.3.6"
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.css"
        />
        <link href="style.css" rel="stylesheet" />
      </head>

      <body>
        <div class="input-bar">
          <div class="input-bar-item width100">
            <form action="/booking">
              <div class="form-group">
                <input
                  class="form-control width100"
                  type="text"
                  placeholder="Ticket Number or Reservation Code(PNR)"
                  name='pnr'
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
      </body>
    </div>
  );
};

export default FindReservations;
